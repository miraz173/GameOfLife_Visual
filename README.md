# GameOfLife

**Title: Visualizing Conway's Game of Life**

**Introduction:**

Welcome to the visualization of Conway's Game of Life! This program brings to life the mesmerizing cellular automaton devised by mathematician John Conway in 1970. Using a grid of cells and a few simple rules, this simulation showcases the emergence of complex patterns and behaviors from the interaction of individual cells.

**Description:**

The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead (or populated and unpopulated, respectively). Every cell interacts with its eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, one of the following events occur:

1. **Survival:** A living cell with 2 or 3 neighbors survives to the next generation.
2. **Death:** A living cell with fewer than 2 or more than 3 neighbors dies due to underpopulation or overpopulation, respectively.
3. **Birth:** A dead cell with exactly 3 neighbors becomes alive due to reproduction.

In this visualization, you'll witness the evolution of the grid over time as cells live, die, and reproduce according to these rules. The program provides controls for starting and stopping the simulation, adjusting the speed of the animation, and resetting the grid to an initial state or generating random configurations.

**How to Use:**

1. **Start/Stop:** Begin or pause the simulation to observe the evolution of the grid.
2. **Speed Control:** Adjust the speed of the animation to observe the changes at your preferred pace.
3. **Reset:** Reset the grid to its initial state, clearing any existing patterns.
4. **Randomize:** Generate random configurations on the grid to observe diverse patterns and behaviors.

postCSS is used  to dynamically convert tailwind to CSS.
