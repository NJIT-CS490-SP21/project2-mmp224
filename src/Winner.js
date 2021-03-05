import React from 'react';
import { Board } from './Board.js';

export function Winner(board) {
  const lines = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],
    [1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] + " is the Winner";
    }
  }
  if(board.includes(null)) {
    return null;
  }
  else{
    return "Its a Draw";
  }
}