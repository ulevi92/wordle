import { useEffect, useState } from "react";
import { fetchSolutions } from "./api/fetchFromDb";
import Wordle from "./components/Wordle";

function App() {
  const [solution, setSolution] = useState<null | string>(null);
  const [solutionId, setSolutionId] = useState<Number>(0);

  useEffect(() => {
    const solution = async () => {
      const solution = await fetchSolutions();

      setSolution(solution.word.toLocaleLowerCase());
      setSolutionId(solution.id);
    };
    solution();
  }, []);

  return (
    <div>
      <h1>Wordle</h1>

      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
