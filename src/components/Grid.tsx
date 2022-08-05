import { FC } from "react";
import { GuessType } from "../hooks/useWordle";
import Row from "./Row";

type GridProps = { currentGuess: string; guesses: GuessType[][]; turn: number };

const Grid: FC<GridProps> = ({ currentGuess, guesses, turn }) => {
  return (
    <div>
      {guesses.map((g, index) => {
        if (turn === index) {
          return <Row key={index} currentGuess={currentGuess} />;
        }

        return <Row key={index} guess={g} />;
      })}
    </div>
  );
};

export default Grid;
