import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import "./RandomList.css";
import Error from "./components/Error";
import CustomButton from "./components/CustomButton";
import Stats from "./components/Stats";

const RandomList: React.FC = () => {
  const [numberArray, setNumberArray] = useState<InumberArray[]>([]);
  const [numberLoading, setNumberLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAndAddData = async () => {
    setNumberLoading(true);
    try {
      const response = await fetch(
        "https://www.random.org/integers/?num=1&min=1&max=20&col=1&base=10&format=plain&rnd=new"
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

  const setNumberFrequency = (number: number) => {
    let numberOfAppearances = 0;
    for (let i = 0; i < numberArray.length; i++) {
      if (numberArray[i].randomNumber === number) {
        numberOfAppearances++;
      }
    }
    return numberOfAppearances;
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
    return !numberArray.isDeleted ? numberArray.randomNumber : Infinity;
  });

  const randomNumbersHighest = numberArray?.map(function (numberArray) {
    return !numberArray.isDeleted ? numberArray.randomNumber : -Infinity;
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
        <h1>Number fetching machine</h1>
      </div>
      {errorMessage.length > 1 ? (
        <Error errorMessage={errorMessage} />
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
                        <CustomButton
                          onClick={() => decreaseOrder(randomNumber.id)}
                          buttonText={"Decrease"}
                        />
                        <CustomButton
                          onClick={() => deleteNumber(randomNumber.id)}
                          buttonText={"Delete"}
                        />
                      </li>
                    )
                  )
              )}
            </ul>
          </div>
          <div>
            {countItems() > 0 ? (
              <Stats
                countItems={countItems}
                calculateSum={calculateSum}
                highestValue={highestValue}
                lowestValue={lowestValue}
              />
            ) : (
              <p>Fetch a number to see stats!</p>
            )}
          </div>
          <div className="fetch-number">
            <CustomButton
              onClick={() => fetchNumber()}
              buttonText={"Fetch number!"}
            />
            <CustomButton
              onClick={() => clearArrays()}
              buttonText={"Delete all!"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RandomList;
