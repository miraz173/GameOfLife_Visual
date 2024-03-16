import "./App.css";
import React, { useEffect, useState } from "react";

const w = window.innerWidth;
const h = window.innerHeight;
const x = 6; //why doesn't it work if I change the value of x?
const sub = x < 9 ? 2 : 1;
const rows = Math.floor(h / (x * 4) - sub);
const cols = Math.floor(w / (x * 4));

let pos = Array.from({ length: rows }, () => {
  return Array.from({ length: cols }, () => {
    return Math.random() > 0.5 ? 0 : 1;
  });
}); //a living cell(pos[i][j]) has 'true' as value in its coordinate position.

function calculateNeighbour(pos, neighbour) {
  console.log(rows, cols);
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (pos[i][j]) {
        //alive cell
        if (i > 0) {
          neighbour[i - 1][j]++;
          if (j > 0) {
            neighbour[i - 1][j - 1]++;
          }
          if (j < cols - 1) {
            neighbour[i - 1][j + 1]++;
          }
        }
        if (i < rows - 1) {
          neighbour[i + 1][j]++;
          if (j > 0) {
            neighbour[i + 1][j - 1]++;
          }
          if (j < cols - 1) {
            neighbour[i + 1][j + 1]++;
          }
        }
        if (j < cols - 1) {
          neighbour[i][j + 1]++;
        }
        if (j > 0) {
          neighbour[i][j - 1]++;
        }
      }
    }
  }
} //calculates the number of alive neighbours of cell(pos[i][j]) and stores them in neighbour[i][j].

function createCell(pos, neighbour) {
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (neighbour[i][j] === 3) {
        pos[i][j] = 1;
      }
    }
  }
} //a dead cell comes to life if it has exactly 3 alive neighbour. Otherwise, the dead remains dead.

function destroyCell(pos, neighbour) {
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (neighbour[i][j] > 3 || neighbour[i][j] < 2) {
        pos[i][j] = 0;
      }
    }
  }
} //a living cell with less than 2 or more than 3 living neighbour is doomed to die.

function Main(set, setSet) {
  pos = [...set];
  let neighbour = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  ); //neighbour[i][j] stores the number of alive neighbours of the cell(pos[i][j]).
  //previously calculated neighbour[][] becomes obsolete as many creation and destruction of living cell has happened.

  calculateNeighbour(pos, neighbour);
  createCell(pos, neighbour);
  destroyCell(pos, neighbour);
  setSet(pos);
}

function App() {
  const [run, setRun] = useState(false);
  const [set, setSet] = useState([...pos]);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    console.log("use effect");
  }, [set]);

  const stopInterval = () => {
    setRun(false);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const startInterval = () => {
    const id = setInterval(() => {
      console.log("Interval triggered");
      Main(set, setSet);
    }, 1000);
    setRun(true);
    setIntervalId(id);
  };

  return (
    <div className="w-full text-center">
      <div className="grid grid-cols-20 justify-center">
        {set.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row justify-center">
            {row.map((color, colIndex) => (
              <Box
                key={`${rowIndex}-${colIndex}`}
                locx={rowIndex}
                locy={colIndex}
                color={color}
                setSet={setSet}
                set={set}
              />
            ))}
          </div>
        ))}
      </div>

      {!run && (
        <div className="flex justify-center mt-2">
          <button
            onClick={() => Main(set, setSet)}
            className="bg-lime-400 m-2 p-2 border mr-8 px-4"
          >
            Next
          </button>
          <button
            onClick={startInterval}
            className="bg-green-400 p-2 m-2 border mr-8"
          >
            Start
          </button>
          <button
            onClick={() =>
              setSet(
                Array.from({ length: rows }, () => {
                  return Array.from({ length: cols }, () => {
                    return 0;
                  });
                })
              )
            }
            className="bg-blue-400 p-2 m-2 border mr-8"
          >
            Reset
          </button>
          <button
            onClick={() =>
              setSet(
                (pos = Array.from({ length: rows }, () => {
                  return Array.from({ length: cols }, () => {
                    return Math.random() > 0.5 ? 0 : 1;
                  });
                }))
              )
            }
            className="bg-teal-400 p-2 m-2 border"
          >
            Random
          </button>
        </div>
      )}
      <div>
        {run && (
          <button onClick={stopInterval} className="bg-red-400 p-2 m-2 border">
            Stop Interval
          </button>
        )}
      </div>
    </div>
  );
}

function Box({ locx, locy, color, setSet, set }) {
  let code = `w-${x} h-${x} bg-${color === 1 ? "white" : "black"} border border-sky-500`;

  function ChangeColor() {
    console.log(locx, locy, set[locx][locy]);
    const updatedSet = [...set];
    updatedSet[locx][locy] = updatedSet[locx][locy] === 0 ? 1 : 0;
    setSet(updatedSet);
  }

  return <div onClick={ChangeColor} className={code}></div>;
}

export default App;
