import './App.css';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

export default function Login({ login }) {
  const player = useRef('');
  return (
    <div>
      <center>
        <h1>TIC TAC TOE</h1>
        <input id="input" ref={player} type="text" />
        <button type="button" onClick={() => login(player.current.value)}>Login</button>
      </center>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};
