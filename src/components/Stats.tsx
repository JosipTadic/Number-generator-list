import React from "react";

const Stats: React.FC<IstatsProps> = ({
  countNumbers,
  calculateSum,
  highestValue,
  lowestValue,
}) => {
  return (
    <>
      <p>Number of items: {countNumbers() === 0 ? "?" : countNumbers()}</p>
      <p>Sum of numbers: {calculateSum() === 0 ? "?" : calculateSum()}</p>
      <p>Highest value: {highestValue === -Infinity ? "?" : highestValue}</p>
      <p>Lowest value: {lowestValue === Infinity ? "?" : lowestValue}</p>
    </>
  );
};

export default Stats;
