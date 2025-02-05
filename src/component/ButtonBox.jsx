import React from "react";

// La balise <ButtonBox> Contiendra ses enfants donc <Button/>

const ButtonBox = ({ children }) => {
  return <div className="buttonBox">{children}</div>;
};

export default ButtonBox;
