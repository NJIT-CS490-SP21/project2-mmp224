import React, { useState, useEffect } from 'react';
import './Board.css';
import PropTypes from 'prop-types';

import io from 'socket.io-client';

const socket = io();

export default function Board2({ onClickButton, element, player2 }) {
  const [access, setAccess] = useState(false);
  useEffect(() => {
    socket.on('login', (login) => {
      if (player2 === login.X || player2 === login.O) {
        setAccess(true);
      }
    });
  }, []);
  function callOnClick() {
    if (access === true) {
      onClickButton();
    }
  }
  return (
    <div
      className="box"
      role="button"
      tabIndex="-1"
      onClick={callOnClick}
      onKeyDown={callOnClick}
    >
      {element}
    </div>
  );
}

Board2.propTypes = {
  onClickButton: PropTypes.func.isRequired,
  element: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
};
