import { FC, useEffect, useState } from "react";
import { fetchLetters } from "../api/fetchFromDb";
import { UsedKeyType } from "../hooks/useWordle";
import { LetterType } from "../types/dbTypes";

type Props = { usedKeys: Map<string, string> };

const Keypad: FC<Props> = ({ usedKeys }) => {
  const [letters, setLetters] = useState<LetterType[] | null>(null);

  useEffect(() => {
    const getLetters = async () => {
      const lettersObj = await fetchLetters();

      setLetters(lettersObj);
    };

    getLetters();
  }, []);

  console.log(usedKeys);

  return (
    <div className='keypad'>
      {letters &&
        letters.map((letter) => {
          const color = usedKeys.get(letter.key);

          console.log(color);

          return (
            <div key={letter.key} className={color}>
              {letter.key}
            </div>
          );
        })}
    </div>
  );
};
export default Keypad;

const usedKeysMap = new Map();

const arr = [
  { key: "a", color: "green" },
  { key: "b", color: "green" },
  { key: "c", color: "yellow" },
];

const entries = [
  ["a", "green"],
  ["b", "yello"],
];

Object.fromEntries(entries);

const map = new Map();

arr.forEach(({ key, color }) => {
  map.set(key, color);
});
