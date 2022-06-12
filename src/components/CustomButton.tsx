import React from "react";

const CustomButton: React.FC<IbuttonProps> = ({buttonText, customStyle, onClick}) => {

  return (
    <button onClick={onClick} className={customStyle}>{buttonText}</button>
  );
};

export default CustomButton;
