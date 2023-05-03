import Converter from './components/Converter';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Converter apiKey={process.env.REACT_APP_API_KEY} />
    </>
  );
}

export default App;
