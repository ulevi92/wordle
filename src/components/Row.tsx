import { FC } from "react";
import { GuessType } from "../hooks/useWordle";

type RowProp = { guess?: GuessType[]; currentGuess?: string };

const Row: FC<RowProp> = ({ guess, currentGuess }) => {
  if (guess) {
    return (
      <div className='row past'>
        {guess.map((letter, index) => {
          return (
            <div key={index} className={letter.color}>
              {letter.key}
            </div>
          );
        })}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");

    return (
      <div className='row current'>
        {letters.map((letter, index) => (
          <div key={index} className='filled'>
            {letter}
          </div>
        ))}

        {[...Array(5 - letters.length)].map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    );
  }

  return (
    <div className='row'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Row;
