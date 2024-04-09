import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);
  function handleClick() {
    setValue('X');
    /* console.log("user clicked!"); */
  }
  return (<button className="square" onClick={handleClick}> {value} </button>);

}

/* This function makes the board accessible to other functions (export), and will be marked as the main function to be referred (default) */
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />

      </div>
    </>
  );
}