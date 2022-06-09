import React from "react";
import { Link } from "react-router-dom";
import "./RandomList.css";

const RandomList: React.FC = () => {
  return (
    <div className="d-flex random-list-wrapper">
      <div className="">
        <Link to="/">Back to Home</Link>
      </div>
      <div className="">
          <p>List is empty!</p>
      </div>
      <div className="fetch-number">
        <button>Fetch number!</button>
      </div>
    </div>
  );
};

export default RandomList;
