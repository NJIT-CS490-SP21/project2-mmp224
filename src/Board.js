import React, { useState, useEffect } from 'react';
import './Board.css';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import Board2 from './Board2';
import Winner from './Winner';

const socket = io();

function Board({ player2 }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [either, post] = useState(true);
  const [player1, setPlayer] = useState({ X: '', O: '', spectator: [] });
  const [follow, setFollow] = useState('X');
  const [tally, setTally] = useState([]);

  function onClickButton(i) {
    const tap = [...board];

    if (Winner(tap)) {
      return;
    }

    const dict2 = { winner: '', loser: '' };

    if (!tap[i]) {
      if (player2 === player1[follow]) {
        if (follow === 'X') {
          tap[i] = 'X';
          setFollow('O');
        } else if (follow === 'O') {
          tap[i] = 'O';
          setFollow('X');
        }
        setBoard(tap);
        socket.emit('click', { tap, post: either, follow });
        const w = Winner(tap);
        if (w === 'X') {
          dict2.winner = player1.X;
          dict2.loser = player1.O;
        } else if (w === 'O') {
          dict2.winner = player1.O;
          dict2.loser = player1.X;
        }
      }
    }
    socket.emit('update', { dict2 });
  }
  useEffect(() => {
    socket.on('click', (data) => {
      setBoard([...data.tap]);
      post(!data.post);
      if (data.follow === 'X') {
        setFollow('O');
      } else if (data.follow === 'O') {
        setFollow('X');
      }
    });
    socket.on(
      'database',
      (score) => {
        setTally(score);
      },
      [],
    );
    socket.on(
      'updateScore',
      (score) => {
        setTally(score);
      },
      [],
    );

    socket.on('login', (login) => {
      Object.keys(login).map((item) => setPlayer((prev) => ({
        ...prev,
        [item]: login[item],
      })));
    });
  }, []);

  const w = Winner(board);
  let rank;
  if (w === 'Draw') {
    rank = 'Its a Draw';
  } else if (w) {
    rank = `${w} is the Winner`;
  }

  const [hide, setHide] = useState(false);

  const clickHide = () => {
    setHide(!hide);
  };

  const boardReset = () => {
    const tap = [...board];
    tap.fill(null);
    setBoard(tap);
    socket.emit('click', { tap, post: 'X' });
  };

  return (
    <div>
      <center>
        <h1>TIC TAC TOE</h1>
      </center>
      <div id="players">
        <h1> Players: </h1>
        <p>
          <b>X:</b>
          {' '}
          {player1.X}
        </p>
        <p>
          <b>O:</b>
          {' '}
          {player1.O}
        </p>
      </div>
      <div id="spectators">
        <h1> Spectators: </h1>
        {player1.spectator.map((player) => (
          <li>{player}</li>
        ))}
      </div>
      <center>
        <div className="board">
          {board.map((element, i) => (
            <Board2
              onClickButton={() => onClickButton(i)}
              element={element}
              player1={player1}
              player2={player2}
            />
          ))}
        </div>
        <div className="fontSize">
          <b>{rank}</b>
        </div>
      </center>
      <button type="button" onClick={clickHide} className="button button1">
        View/Hide LeaderBoard
      </button>
      {player2 === player1.O && (
        <button type="button" onClick={boardReset} className="button button1">
          Reset
        </button>
      )}
      {player2 === player1.X && (
        <button type="button" onClick={boardReset} className="button button1">
          Reset
        </button>
      )}
      <div>
        {hide ? (
          <table>
            <thead>
              <tr>
                <th colSpan="2">LEADERBOARD</th>
              </tr>
            </thead>
            <tbody>
              {tally.map((keys, i) => (player2 === Object.keys(tally[i])[0] ? (
                <tr>
                  <td className="colorBoard">{Object.keys(tally[i])[0]}</td>
                  <td className="colorBoard">{Object.values(tally[i])[0]}</td>
                </tr>
              ) : (
                <tr>
                  <td>{Object.keys(tally[i])[0]}</td>
                  <td>{Object.values(tally[i])[0]}</td>
                </tr>
              )))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}

export default Board;

Board.propTypes = {
  player2: PropTypes.string.isRequired,
};
