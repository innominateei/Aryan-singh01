import React, { useState } from 'react';
import Selector from './Selector';
import Spinner from './Spinner';
import { Button, TextField } from '@mui/material';

export default function Converter(props) {

  const [from, setFrom] = useState('AED');
  const [to, setTo] = useState('AED');
  const [amount, setAmount] = useState('1');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('0');

  const convert = async () => {

    setLoading(true);

    const headers = new Headers();
    headers.append('apikey', props.apiKey);

    const options = {
      method: 'GET',
      headers: headers
    };

    const responce = await fetch(`https://api.apilayer.com/exchangerates_data/convert?from=${from}&to=${to}&amount=${amount}`, options);
    const data = await responce.json();
    setResult((parseFloat(data.info.rate) * parseFloat(amount)).toString());
    setLoading(false);
  }

  const changeAmount = (Event) => {
    if(Event.target.value === undefined)
      setAmount('');
    else
      setAmount(Event.target.value);
  }

  return (
    <div className='container p-2'>
      <div className='row'>
        <div className='col mx-2 p-3'>
          <Selector label='from' curr={from} setCurrency={setFrom} />
        </div>
        <div className='col mx-2 p-3'>
          <Selector label='to' curr={to} setCurrency={setTo} />
        </div>
      </div>
      <div className='row'>
        <div className='col mx-2 p-2 d-flex justify-content-center'>
          <TextField 
            onChange={changeAmount} 
            value={amount}
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
          { loading && <Spinner/> }
          { !loading && <h2>Result: {result}</h2> }
        </div>
      </div>
    </div>
  );
}
