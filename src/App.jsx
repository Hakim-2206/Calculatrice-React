import "./App.css";
import Wrapper from "./component/Wrapper";
import Screen from "./component/Screen";
import ButtonBox from "./component/ButtonBox";
import Button from "./component/Button";
import CalcProvider from "./context/CalcContext";

// const qui contient un tableau, avec les valeurs des boutons de la calculatrice
// Que je vais map() pour afficher chaque valeur pour un bouton
const btnValues = [
  ["C", "", "", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

function App() {
  return (
    <CalcProvider>
      <Wrapper>
        <Screen />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => (
            <Button value={btn} key={i} />
          ))}
        </ButtonBox>
      </Wrapper>
    </CalcProvider>
  );
}

export default App;
