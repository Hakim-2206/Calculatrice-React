import React from "react";

// Composant qui entoure le contenu de la page et qui contient ses enfants ex: Screen ou ButtonBox
const Wrapper = ({ children }) => {
  return (
    <>
      <h1>Calculatrice</h1>
      <div className="wrapper">{children}</div>
    </>
  );
};

export default Wrapper;
