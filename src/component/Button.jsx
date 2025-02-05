import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

// Fonction pour attribuer une classe CSS en fonction du bouton
const getStyleName = (btn) => {
  const className = {
    "=": "equals",
    x: "opt",
    "-": "opt",
    "+": "opt",
    "/": "opt",
  };
  return className[btn];
};

const math = (a, b, sign) => {
  const result = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    x: (a, b) => a * b,
  };
  return result[sign](a, b);
};

const Button = ({ value }) => {
  // Récuperation de l'etat de la calculette depuis le contexte
  const { calc, setCalc } = useContext(CalcContext);

  // Utilisateur clique point
  const commaClick = () => {
    // setCalc({
    //   ...calc, // Maintient l'état précedent
    //   num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    // });
    if (!calc.num.toString().includes(".")) {
      setCalc({
        ...calc,
        num: calc.num.toString() + ".", // Ajoute le point décimal
      });
    }
  };

  // Utilisateur clique sur C "delete"
  const resetClick = () => {
    setCalc({ sign: "", num: "0", res: 0 }); // Reinitialise l'état
  };

  // Utilsateur clique sur un chiffre
  const handleClickBtn = () => {
    const numberString = value.toString(); // convertir en chaine de caracteres et faire une condition

    if (calc.num.toString().includes(".")) {
      setCalc({
        ...calc,
        num: calc.num.toString() + numberString, // Concatène le chiffre
      });
    } else {
      // Si aucun point décimal n'est présent, on traite comme un entier
      setCalc({
        ...calc,
        num: Number(calc.num.toString() + numberString),
      });
    }
  };

  //Utilisateur clique sur un opérateur
  const signClick = () => {
    if (calc.res && calc.num) {
      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: value,
        num: 0,
      });
    } else {
      // Si aucun résultat n'existe encore, on commence un calcul classique
      setCalc({
        sign: value,
        res: calc.num, // initialise le résultat avec le nombre actuel
        num: 0, // vide le champ num
      });
    }
  };

  // Utilisateur clique sur égal
  const equalsClick = () => {
    if (calc.res && calc.num) {
      const res = parseFloat(calc.res);
      const num = parseFloat(calc.num);
      // si il y'a résultat et un nombre, on effectue le calcul
      setCalc({
        res: math(res, num, calc.sign), // Met à jour l'état de l'input en fonction du res
        sign: "",
        num: 0,
      });
    }
  };

  // En fonction de l'operateur cliqué, on va appeler une fonction adapatée
  const handleBtnClick = () => {
    const results = {
      ".": commaClick,
      C: resetClick,
      x: signClick,
      "-": signClick,
      "+": signClick,
      "=": equalsClick,
    };
    if (results[value]) {
      return results[value](); // Appelle la fonction qui correspond
    } else {
      return handleClickBtn(); // Appelle la fonction pour quand l'user clique sur un chiffre
    }
  };

  // desactive les boutons qui ne servent pas
  const isDisabled = value === "" || value === "/";

  return (
    <button
      onClick={handleBtnClick}
      className={`${getStyleName(value)} button`} // Attribution de la classe en fonction du bouton
      disabled={isDisabled}
    >
      {value}
    </button>
  );
};

export default Button;
