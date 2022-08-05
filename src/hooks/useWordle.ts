import { useState } from "react";
// type Dictionary<T> = Record<string, T>;
export type GuessType = { key: string; color: string };
export type UsedKeyType = Record<string, string>;
type HandleKeyUpType = (arg0: KeyboardEvent) => void;

const useWordle = (solution: string | null) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<GuessType[][]>([...Array(6)]);
  const [history, setHistory] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKey, setUsedKey] = useState<Map<string, string>>(new Map());

  //format a guess into an arr of letter objects: [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArr: string[] | null = [...solution!];
    let formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });

    // fint an green letters
    formattedGuess.forEach((letter, index) => {
      if (solutionArr !== null) {
        if (solutionArr[index] === letter.key) {
          formattedGuess[index].color = "green";

          //@ts-ignore
          solutionArr[index] = null;
        }
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArr!.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";

        //@ts-ignore
        solutionArr[solutionArr.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  //add a new guess to the guesses state
  //update the isCorrect state if the guess is correct
  //add one to the turn state
  const addNewGuess = (formatedGuess: GuessType[]) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prev) => {
      let newGuesses = [...prev];
      newGuesses[turn] = formatedGuess;

      return newGuesses;
    });
    setHistory((prev) => {
      return [...prev, currentGuess];
    });

    setTurn((prev) => {
      return prev + 1;
    });

    setUsedKey((prev) => {
      const map = new Map(prev);

      formatedGuess.forEach(({ key, color }) => {
        const shouldUpdate =
          !map.has(key) ||
          map.get(key) === "grey" ||
          (map.get(key) === "yellow" && color === "green");

        if (shouldUpdate) {
          map.set(key, color);
        }
      });
      return map;
    });

    setCurrentGuess("");
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyUp: HandleKeyUpType = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        console.log("you used all your guess");
        return;
      }

      if (history.includes(currentGuess)) {
        console.log("You aleardy tried that word");
        return;
      }

      if (currentGuess.length !== 5) {
        console.log("word must be 5 chars long");
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1).toLocaleLowerCase();
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key.toLocaleLowerCase();
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyUp, usedKey };
};

export default useWordle;
