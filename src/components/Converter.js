import React, { useState } from 'react';
import Selector from './Selector';
import Spinner from './Spinner';

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

    let responce = await fetch(`https://api.apilayer.com/exchangerates_data/convert?from=${from}&to=${to}&amount=${amount}`, options);
    let data = await responce.json();
    setLoading(false);
    setResult(data.info.rate);
  }

  const changeAmount = (Event) => {
    if(Event.value === undefined)
      setAmount('');
    else
      setAmount(Event.value);
  }

  return (
    <>
      <Selector label='from' setCurrency={setFrom} />
      <Selector label='to' setCurrency={setTo} />
      <input onChange={changeAmount} defaultValue={amount} type='text' />
      <button onClick={convert}>Convert</button>
      <h2>{ loading && <Spinner/> }</h2>
      <h1>{ result }</h1>
    </>
  );
}
