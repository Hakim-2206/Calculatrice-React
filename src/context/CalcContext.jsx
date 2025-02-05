import { createContext, useState } from "react";

export const CalcContext = createContext(); // création du contexte que j'appelle CalcContext

const CalcProvider = ({ children }) => {
  // Je déclare l'état 'calc' qui va contenir l'etat de la calculette (le signe, les chiffres, et le resultat)
  const [calc, setCalc] = useState({
    sign: "",
    num: "",
    res: "",
  });

  // const qui contient les valeurs à partager: l'état calc, et la fonction setCalc qui modifie cet état
  const providerValue = {
    calc,
    setCalc,
  };

  // CalcContext.Provider permet aux enfants de ce composant d'accéder au contexte (il enveloppera 'tout')
  return (
    <CalcContext.Provider value={providerValue}>
      {children}
    </CalcContext.Provider>
  );
};

export default CalcProvider;
