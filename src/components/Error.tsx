import React from "react";

const Error: React.FC<IerrorProps> = ({ errorMessage }) => {
  return (
    <div>
      <h2>Something went wrong :S</h2>
      <h3>{errorMessage}</h3>
      <h4>Refresh the page to try again.</h4>
    </div>
  );
};

export default Error;
