import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";
// Importation de Textfit pour ajuster dynamiquement la taille du texte dans l'input

import { Textfit } from "@ataverascrespo/react18-ts-textfit";

const Screen = () => {
  // Je récup l'état du calcul (num, sign et res) depuis le contexte (CalcContext)
  const { calc } = useContext(CalcContext);
  return (
    <Textfit mode="single" max={70} className="screen">
      {calc.num ? calc.num : calc.res}
    </Textfit>
  );
};

export default Screen;
