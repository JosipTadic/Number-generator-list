import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <h1 className="text-center first-title">
        Welcome to random number fetcher
      </h1>
      <div className="App d-flex text-center">
        <Link to="/random-list">Random list</Link>
        <h2>Click on the link to proceed!</h2>
      </div>
    </>
  );
}

export default App;
