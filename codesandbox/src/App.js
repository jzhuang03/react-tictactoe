import { useState } from 'react';


/* Child component */
function Square({ value, onSquareClick }) {
  return (<button className="square" onClick={onSquareClick}> {value} </button>);

}

/* Parent component: This function makes the board accessible to other functions (export), and will be marked as the main function to be referred (default) */
export default function Board() {
  /* Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and the game’s state will be saved. */
  const [xIsNext, setXIsNext] = useState(true);

  /* Board component now maintains which squares are filled */
  const [squares, setSquares] = useState(Array(9).fill(null));

  /* immutability: replace the data with a new copy which has the desired changes */
  function handleClick() {

    /* a base case to prevent overwriting a square by checking if it already has input OR has won*/
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    /* flip the value so that the next player can go */
    setXIsNext(!IsNext);

  }

  /* display text to show who is winner */
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />

      </div>
    </>
  );

  function calculateWinner(squares) {

    /* all of the possible sequences to determine a winner */
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      /* see if the sequence that we currently have matches with any sequence in possible list */
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

}