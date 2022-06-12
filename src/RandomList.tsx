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
      const randomNumber: number = await response.json();
      numberArray.map(number => (number.lastPulledOut = false));
      const newNumber = {
        randomNumber: randomNumber,
        order: getNumberFrequency(randomNumber) + 1,
        id: nanoid(),
        lastPulledOut: true,
        isDeleted: false,
      };
      setNumberArray(numberArray.concat(newNumber));
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setNumberLoading(false);
    }
  };

  const fetchNumber = () => {
    fetchAndAddData();
  };

  const clearList = () => {
    setNumberArray([]);
  };

  const getNumberFrequency = (number: number) => {
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
      numberArray.map(number => {
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
      numberArray.map(number => {
        if (number.id === id) {
          number.isDeleted = true;
        }
        return number;
      })
    );
  };

  const countNumbers = () => {
    let countRandomNumbers = 0;
    numberArray.map(number => {
      if (!number.isDeleted) {
        return countRandomNumbers++;
      } else return 0;
    });
    return countRandomNumbers;
  };

  const calculateSum = () => {
    let sumOfNumbers = 0;
    numberArray.map(number => {
      if (!number.isDeleted) {
        return (sumOfNumbers += number.randomNumber);
      } else return 0;
    });
    return sumOfNumbers;
  };

  const lowestNumbers = numberArray?.map(function (numberArray) {
    return !numberArray.isDeleted ? numberArray.randomNumber : Infinity;
  });

  const highestNumbers = numberArray?.map(function (numberArray) {
    return !numberArray.isDeleted ? numberArray.randomNumber : -Infinity;
  });

  const highestValue = highestNumbers
    ? Math.max(...highestNumbers)
    : 0;

  const lowestValue = lowestNumbers
    ? Math.min(...lowestNumbers)
    : 0;

  return (
    <div className="d-flex random-list-wrapper">
      <div className="d-flex second-header">
        <Link to="/">Home</Link>
        <h1 className="text-center">Random number fetcher</h1>
        <div></div>
      </div>
      {errorMessage.length > 1 ? (
        <Error errorMessage={errorMessage} />
      ) : (
        <>
          <div className="fetch-list d-flex">
            {numberLoading || countNumbers() > 0 ? <></> : <p>List is empty!</p>}
            <ul>
              {numberLoading ? (
                <div className="d-flex text-center fetch-loading-string">
                  Loading...
                </div>
              ) : (
                numberArray
                  .sort((a, b) => a.randomNumber - b.randomNumber)
                  .map(number =>
                    number.isDeleted ? (
                      <></>
                    ) : (
                      <li key={number.id}>
                        <div className="d-flex list-item">
                          <p className="number-from-list">
                            {number.lastPulledOut ? (
                              <b className="last-number">
                                {number.randomNumber}
                              </b>
                            ) : (
                              number.randomNumber
                            )}
                            {number.order > 0 &&
                            getNumberFrequency(number.randomNumber) > 1
                              ? "/" + number.order
                              : ""}
                          </p>
                          <CustomButton
                            onClick={() => decreaseOrder(number.id)}
                            buttonText={"Decrease"}
                            customStyle={"list-button btn-1"}
                          />
                          <CustomButton
                            onClick={() => deleteNumber(number.id)}
                            buttonText={"Delete"}
                            customStyle={"list-button btn-1"}
                          />
                        </div>
                      </li>
                    )
                  )
              )}
            </ul>
          </div>
          <div className="fetch-stats d-flex">
            {countNumbers() > 0 ? (
              <Stats
                countNumbers={countNumbers}
                calculateSum={calculateSum}
                highestValue={highestValue}
                lowestValue={lowestValue}
              />
            ) : (
              <p>Fetch a number to see stats!</p>
            )}
          </div>
          <div className="fetch-number d-flex">
            <CustomButton
              onClick={() => fetchNumber()}
              buttonText={"Fetch number!"}
              customStyle={"custom-btn btn-1"}
            />
            <CustomButton
              onClick={() => clearList()}
              buttonText={"Delete all!"}
              customStyle={"custom-btn btn-1"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RandomList;
