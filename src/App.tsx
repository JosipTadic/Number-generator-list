import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="App d-flex">
        <Link to="/random-list">Random list</Link>
      </div>
    </>
  );
}

export default App;
