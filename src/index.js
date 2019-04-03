import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

Array.prototype.mutateAt = function(i, newValue) {
  let newArray = this.slice();
  newArray[i] = newValue;
  console.log(newValue);
  return newArray;
};

const Square = ({ id, value, handleClick }) => {
  return (
    <button className='square' onClick={handleClick}>
      {value}
    </button>
  );
};

const Board = () => {
  const [turn, setTurn] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const onSquareClick = (id) => () => {
    console.log(`Square ${id} is clicked`);
    setSquares(squares.mutateAt(id, turn ? "X" : "O"));
    setTurn(!turn);
  };
  const renderSquare = (id) => (
    <Square id={id} value={squares[id]} handleClick={onSquareClick(id)} />
  );

  const status = "Next player: X";

  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>
      <div className='game-info'>
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
