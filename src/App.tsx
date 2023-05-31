import { useState } from 'react';
import './App.css'

function App () {

  const [x, setX] = useState<number | null>(null);
  const [y, setY] = useState<number | null>(null);
  const [facing, setFacing] = useState<string | null>(null);
  const [isPlaced, setIsPlaced] = useState<boolean>(false);

  const gridWidth = 5;
  const gridHeight = 5;
  const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

  // Function to place Pacman at a given position and facing direction
  const place = (x: number, y: number, facing: string) => {
    if (isValidPosition(x, y) && directions.includes(facing)) {
      setX(x);
      setY(y);
      setFacing(facing);
      setIsPlaced(true)
    }
  };

  // Function to move Pacman one step in the current facing direction
  const move = () => {
    if (facing === 'NORTH' && isValidPosition(x!, y! + 1)) {
      setY(y! + 1);
    } else if (facing === 'EAST' && isValidPosition(x! + 1, y!)) {
      setX(x! + 1);
    } else if (facing === 'SOUTH' && isValidPosition(x!, y! - 1)) {
      setY(y! - 1);
    } else if (facing === 'WEST' && isValidPosition(x! - 1, y!)) {
      setX(x! - 1);
    }
  };

   // Function to rotate Pacman 90 degrees to the left
  const left = () => {
    if (directions.includes(facing!)) {
      const currentIndex = directions.indexOf(facing!);
      const newFacing = directions[(currentIndex - 1 + 4) % 4];
      setFacing(newFacing);
    }
  };

   // Function to rotate Pacman 90 degrees to the right
  const right = () => {
    if (directions.includes(facing!)) {
      const currentIndex = directions.indexOf(facing!);
      const newFacing = directions[(currentIndex + 1) % 4];
      setFacing(newFacing);
    }
  };

  // Function to report Pacman's current position and facing direction
  const report = () => {
    if (x !== null && y !== null && facing !== null) {
      console.log(`Pacman's current position: (${x}, ${y}), facing ${facing}`);
    }
  };

    // Function to check if the given position is within the grid boundaries
  const isValidPosition = (x: number, y: number) => {
    return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;
  };

  return (
    <div className="App">
      <button onClick={() => place(0, 0, 'NORTH')}>Place Pacman</button>
      <button disabled={!isPlaced} onClick={move}>Move</button>
      <button disabled={!isPlaced} onClick={left}>Left</button>
      <button disabled={!isPlaced} onClick={right}>Right</button>
      <button disabled={!isPlaced} onClick={report}>Report</button>
    </div>
  );
};

export default App;
