import "./App.css";
import React, { useEffect, useState } from "react";

const w = window.innerWidth;
const h = window.innerHeight;

function App() {
  const [game, setGame] = useState(true);
  const [t, setT] = useState(10);
  const [x, setX] = useState(6);
  const [c, setC] = useState(0);
  const [r, setR] = useState(0);
  const rows =
    r < 3 ? Math.floor(h / (x * 4) - (x < 9 ? (x < 6 ? 3 : 2) : 1)) : r;
  const cols = c < 3 ? Math.floor(w / (x * 4)) : c;

  let pos = Array.from({ length: rows }, () => {
    return Array.from({ length: cols }, () => {
      return Math.random() > 0.5 ? 0 : 1;
    });
  }); //a living cell(pos[i][j]) has 'true' as value in its coordinate position.

  function calculateNeighbour(pos, neighbour) {
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

  function Box({ locx, locy, setSet, set }) {
    let color = set[locx][locy] === 0 ? "black" : "white";
    function ChangeColor() {
      const updatedSet = [...set];
      updatedSet[locx][locy] = updatedSet[locx][locy] === 0 ? 1 : 0;
      setSet(updatedSet);
    }

    const style = {
      background: color,
      width: 4 * x + "px",
      height: 4 * x + "px",
      border: "1px solid",
      borderColor: "rgb(14, 165, 233)",
    };

    return <div onClick={ChangeColor} style={style}></div>;
  } //print individual cell with alive cell being white and dead being black

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

  let y = x;
  function Game() {
    const [run, setRun] = useState(false);
    const [set, setSet] = useState([...pos]);
    const [intervalId, setIntervalId] = useState(null);
    const [iCount, setICount] = useState(0);

    useEffect(() => {}, [set]);

    const stopInterval = () => {
      setRun(false);
      clearInterval(intervalId);
      setIntervalId(null);
    };

    const startInterval = () => {
      const id = setInterval(() => {
        setICount((iCount) => iCount + 1);
        Main(set, setSet);
      }, 100* t);
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
              onClick={() => setGame(false)}
              className="bg-red-400 p-2 border mr-8"
            >
              Setting
            </button>
            <button
              onClick={() => {
                Main(set, setSet);
                setICount(iCount + 1);
              }}
              className="bg-lime-400 p-2 border mr-8 px-4"
            >
              Next
            </button>
            <button
              onClick={startInterval}
              className="bg-green-400 p-2 border mr-8"
            >
              Start
            </button>
            <button
              onClick={() => {
                setICount(0);
                setSet(
                  Array.from({ length: rows }, () => {
                    return Array.from({ length: cols }, () => {
                      return 0;
                    });
                  })
                );
              }}
              className="bg-blue-400 p-2 border mr-8"
            >
              Reset
            </button>
            <button
              onClick={() => {
                setSet(
                  (pos = Array.from({ length: rows }, () => {
                    return Array.from({ length: cols }, () => {
                      return Math.random() > 0.5 ? 0 : 1;
                    });
                  }))
                );
                setICount(0);
              }}
              className="bg-teal-400 p-2 border mr-8"
            >
              Random
            </button>
            <div className="bg-teal-100 p-2 px-4 border text-blue-950">
              {iCount}
            </div>
          </div>
        )}
        {run && (
          <div className="flex justify-center mt-2">
            <button
              onClick={stopInterval}
              className="bg-red-400 p-2 border mr-8"
            >
              Stop Interval
            </button>
            <div className="bg-teal-100 p-2 px-4 border text-blue-950">
              {iCount}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!game) {
    return (
      <>
        <div className="w-full h-dvh bg-teal-100 my-auto text-center justify-center">
          <p className="font-bold text-lg">Conways Game of Life</p>
          <div className="p-2 mt-6">
            <p>Enter the size of each individual cell</p>
            <input
              type="number"
              placeholder={x + " (px)"}
              className="border p-1 border-black rounded"
              onChange={(e) => {
                y = e.target.value;
              }}
            />
          </div>
          <div className="p-2 mt-2">
            <p>Enter the interval time</p>
            <input
              type="number"
              placeholder={t +" *100ms"}
              onChange={(e) => {
                setT(e.target.value > 0 ? e.target.value : t);
              }}
              className="border p-1 border-black rounded"
            />
          </div>
          <div className="p-2 mt-2">
            <p>Number of rows (optional)</p>
            <input
              type="number"
              placeholder={rows}
              onChange={(e) => {
                setR(e.target.value > 2 ? e.target.value : rows);
              }}
              className="border p-1 border-black rounded"
            />
          </div>
          <div className="p-2 mt-2">
            <p>Number of columns (optional)</p>
            <input
              type="number"
              placeholder={cols}
              onChange={(e) => {
                setC(e.target.value > 2 ? e.target.value : cols);
              }}
              className="border p-1 border-black rounded"
            />
          </div>
          <button
            onClick={() => {
              setGame(true);
              setX(y);
            }}
            className="bg-blue-400 p-2 border mt-2"
          >
            Start Game
          </button>
        </div>
      </>
    );
  } else {
    return <Game />;
  }
}
export default App;
