/// <reference types="react-scripts" />

interface InumberArray {
  randomNumber: number;
  order: number;
  id: string;
  lastPulledOut: boolean;
  isDeleted: boolean;
}

interface IerrorProps {
    errorMessage: string;
}

interface IbuttonProps {
    buttonText: string;
    onClick?: function;
    customStyle?: string;
}

interface IstatsProps {
    countItems: function;
    calculateSum: function;
    highestValue: number;
    lowestValue: number;
}
