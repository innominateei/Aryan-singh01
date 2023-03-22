import Converter from './components/Converter';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Converter apiKey={process.env.REACT_APP_API_KEY} />
    </div>
  );
}

export default App;
