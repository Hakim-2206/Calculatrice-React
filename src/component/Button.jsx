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

const Button = ({ value }) => {
  // Récuperation de l'etat de la calculette depuis le contexte
  const { calc, setCalc } = useContext(CalcContext);

  // Utilisateur clique point
  const commaClick = () => {
    setCalc({
      ...calc, // Maintient l'état précedent
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  // Utilisateur clique sur C "delete"
  const resetClick = () => {
    setCalc({ sign: "", num: "0", res: 0 }); // Reinitialise l'état
  };

  // Utilsateur clique sur un chiffre
  const handleClickBtn = () => {
    const numberString = value.toString(); // convertir en chaine de caracteres et faire une condition

    // Si un chiffre est tapé après un resultat (pas d'opérateur avant), on démarre un nouveau calcul
    if (calc.res && !calc.sign) {
      setCalc({
        sign: "",
        num: Number(numberString),
        res: 0,
      });
      // sinon, on concatène le chiffre actuel avec le précedent pour en former un nouveau
    } else {
      setCalc({
        ...calc,
        num: Number(calc.num.toString() + numberString), // Empeche les zéro inutiles au début
      });
    }
  };

  //Utilisateur clique sur un opérateur
  const signClick = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: "", // Reinitialise le nombre
    });
  };

  // Utilisateur clique sur égal
  const equalsClick = () => {
    if (calc.res && calc.num) {
      // si il y'a résultat et un nombre, on effectue le calcul
      const math = (a, b, sign) => {
        const result = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
          x: (a, b) => a * b,
        };
        return result[sign](a, b);
      };
      setCalc({
        res: math(calc.res, calc.num, calc.sign), // Met à jour l'état de l'input en fonction du res
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
