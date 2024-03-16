function calculateNeighbour(pos, neighbour) {
  for (let i = 0; i < 20; ++i) {
    for (let j = 0; j < 20; ++j) {
      if (pos[i][j]) {
        if (i > 0) {
          neighbour[i - 1][j]++;
          if (j > 0) {
            neighbour[i - 1][j - 1]++;
          }
          if (j < 19) {
            neighbour[i - 1][j + 1]++;
          }
        }
        if (i < 19) {
          neighbour[i + 1][j]++;
          if (j > 0) {
            neighbour[i + 1][j - 1]++;
          }
          if (j < 19) {
            neighbour[i + 1][j + 1]++;
          }
        }
        if (j < 19) {
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
  for (let i = 0; i < 20; ++i) {
    for (let j = 0; j < 20; ++j) {
      if (neighbour[i][j] === 3) {
        pos[i][j] = true;
      }
    }
  }
} //a dead cell comes to life if it has exactly 3 alive neighbour. Otherwise, the dead remains dead.

function destroyCell(pos, neighbour) {
  for (let i = 0; i < 20; ++i) {
    for (let j = 0; j < 20; ++j) {
      if (neighbour[i][j] > 3 || neighbour[i][j] < 2) {
        pos[i][j] = false;
      }
    }
  }
} //a living cell with less than 2 or more than 3 living neighbour is doomed to die.

function Main() {
  const rows = 20;
  const cols = 20;
  let pos = Array.from({ length: rows }, () => {
    return Array.from({ length: cols }, () => {
      console.log();
      return Math.random() > 0.5 ? 0 : 1;
    });
  }); //a living cell(pos[i][j]) has 'true' as value in its coordinate position.

  let iCount = 0; //number of iteration in while loop.

  //   takeInput(pos);
  while (iCount <= 20) {
    //program ends in 20th iteration

    let neighbour = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );
    //neighbour[i][j] stores the number of alive neighbours of the cell(pos[i][j]).
    //previously calculated neighbour[][] becomes obsolete as many creation and destruction of living cell has happened.

    // print(pos);
    calculateNeighbour(pos, neighbour);
    createCell(pos, neighbour);
      destroyCell(pos, neighbour);
      console.log(pos);
    // system("pause"); //pauses the program before before jumping to next iteration, giving time to check the output.
    // system("cls"); //clears console screen before next output.

    iCount++;
  }
}

Main();

// export default Main;
