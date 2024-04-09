import { useState } from 'react';


/* Child component */
function Square({ value, onSquareClick }) {
  return (<button className="square" onClick={onSquareClick}> {value} </button>);

}

/* ex-Parent top-level component */
function Board({ xIsNext, squares, onPlay }) {

  /* immutability: replace the data with a new copy which has the desired changes */
  function handleClick(i) {

    /* a base case to prevent overwriting a square by checking if it already has input OR has won*/
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);

    // setSquares(nextSquares);
    // /* flip the value so that the next player can go */
    // setXIsNext(!IsNext);

  }

  /* current top level component: display text to show who is winner */
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
}

/* display a list that contains a history of past moves */
export default function Game() {

  /* Add some state to the Game component to track which player is next and the history of moves */
  const [history, setHistory] = useState([Array(9).fill(null)]);

  /* keep track of which step the user is currently viewing */
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;

  /* render the currently selected move, instead of always rendering the final move */
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // TODO: implementing handleClick functionality like we used to, but this time taking account of the moves that were taken. update currentMove to point to the latest history entry.
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  /* transform history of moves into React elements representing buttons on the screen, and display a list of buttons to “jump” to past moves */
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    /* specify specific moves as a key since we are working with dynamic lists */
    return (
      <li key={move}>
     <button onClick={() => jumpTo(move)} className={move === currentMove ? 'selectedmove' : ''}>
        {description}
      </button>
            </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


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