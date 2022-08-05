import { FC } from "react";

type Props = { isCorrect: boolean; turn: number; solution: string };

const Modal: FC<Props> = ({ isCorrect, turn, solution }) => {
  return (
    <div className='modal'>
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className='solution'>{solution}</p>
          <p>
            You found the solution in{" "}
            {turn === 1 ? `${turn} guess` : `${turn} guesses`} :)
          </p>
        </div>
      )}

      {!isCorrect && (
        <div>
          <h1>You lost!</h1>
          <p className='solution'>{solution}</p>
          <p>Better luck next time :)</p>
        </div>
      )}
    </div>
  );
};

export default Modal;
