import { LetterType, SolutionType } from "../types/dbTypes";

const urlSolutions = "http://localhost:3000/solutions";
const urlLetters = "http://localhost:3000/letters";

export const fetchSolutions = async () => {
  try {
    const res = await fetch(urlSolutions);
    const data: SolutionType[] = await res.json();

    const singleWord = data[Math.floor(Math.random() * data.length)];

    return singleWord;
  } catch (error) {
    throw new Error(`can't fetch data:` + error);
  }
};

export const fetchLetters = async () => {
  try {
    const res = await fetch(urlLetters);
    const data: LetterType[] = await res.json();

    return data;
  } catch (error) {
    throw new Error(`can't fetch data:` + error);
  }
};
