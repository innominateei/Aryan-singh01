import './App.css';
import Converter from './components/Converter';
import Navbar from './components/Navbar';

function App() {

  const apiKey = process.env.REACT_APP_API_KEY;

  return (
    <>
      <Navbar />
      <Converter apiKey={apiKey} />
    </>
  );
}

export default App;
