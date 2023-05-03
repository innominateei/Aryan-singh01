import React, { useReducer } from 'react';
import Selector from './Selector';
import Spinner from './Spinner';
import { Button, TextField } from '@mui/material';

function reducer(state, action) {
  switch (action.type) {
    case 'setFrom':
      return { ...state, from: action.payload };
    case 'setTo':
      return { ...state, to: action.payload };
    case 'setAmount':
      return { ...state, amount: action.payload };
    case 'setLoading':
      return { ...state, loading: action.payload };
    case 'setResult':
      return { ...state, result: action.payload };
    default:
      throw new Error();
  }
}

export default function Converter(props) {

  const [state, dispatch] = useReducer(reducer, {
    from: 'AED',
    to: 'AED',
    amount: '1',
    loading: false,
    result: '0'
  });

  const convert = async () => {

    dispatch({ type: 'setLoading', payload: true });

    const headers = new Headers();
    headers.append('apikey', props.apiKey);

    const options = {
      method: 'GET',
      headers: headers
    };

    const responce = await fetch(`https://api.apilayer.com/exchangerates_data/convert?from=${state.from}&to=${state.to}&amount=${state.amount}`, options);
    const data = await responce.json();
    dispatch({ type: 'setResult', payload: ((parseFloat(data.info.rate) * parseFloat(state.amount)).toString()) });
    dispatch({ type: 'setLoading', payload: false });
  }

  const changeAmount = (Event) => {
    if(Event.target.value === undefined)
      dispatch({ type: 'setAmount', payload: '' });
    else
      dispatch({ type: 'setAmount', payload: Event.target.value });
  }

  return (
    <div className='container p-2'>
      <div className='row'>
        <div className='col mx-2 p-3'>
          <Selector label='from' curr={state.from} dispatch={dispatch} />
        </div>
        <div className='col mx-2 p-3'>
          <Selector label='to' curr={state.to} dispatch={dispatch} />
        </div>
      </div>
      <div className='row'>
        <div className='col mx-2 p-2 d-flex justify-content-center'>
          <TextField 
            onChange={changeAmount} 
            value={state.amount}
            id='outlined-basic' 
            label='Amount' 
            variant='outlined'
            sx={{ m: 2 }}
          />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col mx-2 p-2 d-flex justify-content-center'>
          <Button onClick={convert} variant='contained'>Convert</Button>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col mx-2 p-2 d-flex justify-content-center'>
          { state.loading && <Spinner/> }
          { !state.loading && <h2>Result: {state.result}</h2> }
        </div>
      </div>
    </div>
  );
}
