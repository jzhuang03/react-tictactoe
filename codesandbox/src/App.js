
/* In improving efficiency, we must add a parameter/prop that takes in a value within each square of the grid board*/
function Square({ value }) {
  function handleClick() {
    console.log("user clicked!");
  }
  return (<button className="square" onClick={handleClick}> {value} </button>);

}

/* This function makes the board accessible to other functions (export), and will be marked as the main function to be referred (default) */
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />

      </div>
    </>
  );
}