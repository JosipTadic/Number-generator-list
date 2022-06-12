import React from "react";

const Stats: React.FC<IstatsProps> = ({countItems, calculateSum, highestValue, lowestValue}) => {
  return (
    <>
      <p>
        Number of items and frequency: {countItems() === 0 ? "?" : countItems()}
      </p>
      <p>Sum of numbers: {calculateSum() === 0 ? "?" : calculateSum()}</p>
      <p>Heighest value: {highestValue === -Infinity ? "?" : highestValue}</p>
      <p>Lowest value: {lowestValue === Infinity ? "?" : lowestValue}</p>
    </>
  );
};

export default Stats;
