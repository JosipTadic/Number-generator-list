import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import "./RandomList.css";

interface InumberArray {
  randomNumber: number;
  order: number;
  id: string;
  lastPulledOut: boolean;
  isDeleted: boolean;
}

const RandomList: React.FC = () => {
  const [numberArray, setNumberArray] = useState<InumberArray[]>([]);
  const [numberLoading, setNumberLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAndAddData = async () => {
    setNumberLoading(true);
    try {
      const response = await fetch(
        "https://www.random.org/integers/?num=1&min=1&max=3&col=1&base=10&format=plain&rnd=new"
      );
      const singleNumber: number = await response.json();
      numberArray.map((lastNumber) => (lastNumber.lastPulledOut = false));
      const newRow = {
        randomNumber: singleNumber,
        order: setNumberFrequency(singleNumber) + 1,
        id: nanoid(),
        lastPulledOut: true,
        isDeleted: false,
      };
      setNumberArray(numberArray.concat(newRow));
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setNumberLoading(false);
    }
  };

  const fetchNumber = () => {
    fetchAndAddData();
  };

  const clearArrays = () => {
    setNumberArray([]);
  };

  const setNumberFrequency = (lastNumber: number) => {
    let numberOfAppearance = 0;
    for (let i = 0; i < numberArray.length; i++) {
      if (numberArray[i].randomNumber === lastNumber) {
        numberOfAppearance++;
      }
    }
    return numberOfAppearance;
  };

  const decreaseOrder = (id: string) => {
    setNumberArray(
      numberArray.map((number) => {
        if (number.id === id) {
          number.order--;
          if (number.order === 0) {
            deleteNumber(id);
          }
        }
        return number;
      })
    );
  };

  const deleteNumber = (id: string) => {
    setNumberArray(
      numberArray.map((number) => {
        if (number.id === id) {
          number.isDeleted = true;
        }
        return number;
      })
    );
  };

  const countItems = () => {
    let countRandomNumbers = 0;
    numberArray.map((number) => {
      if (!number.isDeleted) {
        return countRandomNumbers++;
      } else return 0;
    });
    return countRandomNumbers;
  };

  const calculateSum = () => {
    let sumOfRandomNumbers = 0;
    numberArray.map((number) => {
      if (!number.isDeleted) {
        return (sumOfRandomNumbers += number.randomNumber);
      } else return 0;
    });
    return sumOfRandomNumbers;
  };

  const randomNumbersLowest = numberArray?.map(function (numberArray) {
    if (!numberArray.isDeleted) {
      return numberArray.randomNumber;
    } else {
      return Infinity;
    }
  });

  const randomNumbersHighest = numberArray?.map(function (numberArray) {
    if (!numberArray.isDeleted) {
      return numberArray.randomNumber;
    } else {
      return -Infinity;
    }
  });
  const highestValue = randomNumbersHighest
    ? Math.max(...randomNumbersHighest)
    : 0;
  const lowestValue = randomNumbersLowest
    ? Math.min(...randomNumbersLowest)
    : 0;

  return (
    <div className="d-flex random-list-wrapper">
      <div className="">
        <Link to="/">Back to Home</Link>
      </div>
      {errorMessage.length > 1 ? (
        <div>
          <h2>Something went wrong :S</h2>
          <h3>{errorMessage}</h3>
        </div>
      ) : (
        <>
          <div className="">
            {countItems() > 0 ? <></> : <p>List is empty!</p>}
            <ul>
              {numberLoading ? (
                <div>Loading...</div>
              ) : (
                numberArray
                  .sort((a, b) => a.randomNumber - b.randomNumber)
                  .map((randomNumber) =>
                    randomNumber.isDeleted ? (
                      <></>
                    ) : (
                      <li key={randomNumber.id}>
                        {randomNumber.lastPulledOut ? (
                          <b>{randomNumber.randomNumber}</b>
                        ) : (
                          randomNumber.randomNumber
                        )}
                        {randomNumber.order > 0 &&
                        setNumberFrequency(randomNumber.randomNumber) > 1
                          ? "/" + randomNumber.order
                          : ""}
                        <button onClick={() => decreaseOrder(randomNumber.id)}>
                          Decrease
                        </button>
                        <button onClick={() => deleteNumber(randomNumber.id)}>
                          Delete
                        </button>
                      </li>
                    )
                  )
              )}
            </ul>
          </div>
          <div>
            <p>
              Number of items and frequency:{" "}
              {countItems() === 0 ? "?" : countItems()}
            </p>
            <p>Sum of numbers: {calculateSum() === 0 ? "?" : calculateSum()}</p>
            <p>
              Heighest value: {highestValue === -Infinity ? "?" : highestValue}
            </p>
            <p>Lowest value: {lowestValue === Infinity ? "?" : lowestValue}</p>
          </div>
          <div className="fetch-number">
            <button onClick={() => fetchNumber()}>Fetch number!</button>
            <button onClick={() => clearArrays()}>Delete all!</button>
          </div>
        </>
      )}
    </div>
  );
};

export default RandomList;
