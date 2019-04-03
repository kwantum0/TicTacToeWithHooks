import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const ArrayLike = Array;
ArrayLike.prototype.setAt = function(i, newValue) {
  let newArray = this.slice();
  newArray[i] = newValue;
  return newArray;
};
ArrayLike.prototype.incBy = function(i, increment) {
  let newValue = this[i] + increment;
  return this.setAt(i, newValue);
};

const EMPTY_GAME = ArrayLike(9).fill(null);
const PIECES = ["O", "X"];
const WINNING_VALUES = [
  // rows
  1 + 2 + 4,
  8 + 16 + 32,
  64 + 128 + 256,
  // cols
  1 + 8 + 64,
  2 + 16 + 128,
  4 + 32 + 256,
  // diag
  1 + 16 + 256,
  4 + 16 + 64,
];
const checkWinner = ([yValue, xValue]) => {
  if (WINNING_VALUES.some((winner) => (winner & yValue) === winner)) {
    return PIECES[0];
  }
  if (WINNING_VALUES.some((winner) => (winner & xValue) === winner)) {
    return PIECES[1];
  }
  return null;
};

const Square = ({ id, piece, disabled, handleClick }) => {
  return (
    <button className='square' onClick={handleClick} disabled={disabled}>
      {piece || ""}
    </button>
  );
};

const Board = () => {
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState("");
  const [values, setValues] = useState([0, 0]);
  const [player, setPlayer] = useState(true);
  const [squares, setSquares] = useState(EMPTY_GAME);
  const onSquareClick = (id, val) => () => {
    if (!squares[id]) {
      setSquares(squares.setAt(id, PIECES[+player]));
      setValues(values.incBy(+player, val));
      setPlayer(!player);
    }
  };
  const restart = () => {
    setSquares(EMPTY_GAME);
    setValues([0, 0]);
    setPlayer(true);
    setPaused(false);
  };

  useEffect(() => {
    const winner = checkWinner(values);
    const NormalStatus = `Next player: ${PIECES[+player]}`;
    const WinningStatus = `Player ${winner} has Won!`;
    const DrawwingStatus = `Tie Game.`;

    if (winner) {
      setStatus(WinningStatus);
      setPaused(true);
    } else if (squares.every((square) => !!square)) {
      setStatus(DrawwingStatus);
      setPaused(true);
    } else {
      setStatus(NormalStatus);
    }
  });

  const renderSquare = (id, val) => (
    <Square
      id={id}
      piece={squares[id]}
      disabled={paused}
      handleClick={onSquareClick(id, val)}
    />
  );

  const renderNewGame = (id, val) => (
    <button className='new-game' hidden={!paused} onClick={restart}>
      New Game
    </button>
  );

  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0, 1)}
        {renderSquare(1, 2)}
        {renderSquare(2, 4)}
      </div>
      <div className='board-row'>
        {renderSquare(3, 8)}
        {renderSquare(4, 16)}
        {renderSquare(5, 32)}
      </div>
      <div className='board-row'>
        {renderSquare(6, 64)}
        {renderSquare(7, 128)}
        {renderSquare(8, 256)}
      </div>
      {renderNewGame()}
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
