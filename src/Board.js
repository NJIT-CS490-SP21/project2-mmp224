import React from 'react';
import './Board.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {Board2} from './Board2.js';
import {Winner} from './Winner.js';

const socket = io();

export function Board({player2}) {
    const [board, setBoard] = useState(Array(9).fill(null));
    let [either, post] = useState(true);
    const [player1,setPlayer] = useState({ "X": "", "O": "", "spectator": [] });
    const [follow, setFollow] = useState("X");
    
    function onClickButton(i){
        let tap;
        tap = [...board];
        if(!tap[i]) {
            if(player2 == player1[follow]){
                if (follow == "X") {
                    tap[i] = "X";
                    setFollow("O");
                }
                else if(follow == "O"){
                    tap[i] = "O";
                    setFollow("X");
                }
                setBoard(tap);
                socket.emit('click', {tap : tap, post : either, follow});
            }
        }
    }
    useEffect(() => {
    socket.on('click', (data) => {
      console.log('Click event received!');
      console.log(data);
      setBoard([...data.tap]);
      post(!data.post)
          if (data.follow == "X"){
              setFollow("O");
          }
          else if(data.follow == "O"){
              setFollow("X");
          }
      });
      socket.on('login', (login) => {
          console.log('Logged in!');
          console.log(login);
          Object.keys(login).map((item) => {
                console.log(item, login[item])
                setPlayer((prev) => ({
                    ...prev,
                    [item]: login[item]
                }))
            })
        });
    }, []);
    
    const w = Winner(board)
    let rank
    if(w){
        rank = `${w}`
    }

    const boardReset = ()=> {
        let tap;
        tap = [...board];
        tap.fill(null);
        setBoard(tap);
        socket.emit('click', {tap : tap, post : "X"})
    }
    
    
    return (
        <div>
            <center><h1>TIC TAC TOE</h1></center>
            <div id="players">
                <h1> Players: </h1>
                <p><b>X:</b> {player1['X']}</p>
                <p><b>O:</b> {player1['O']}</p>
            </div>
            <div id="spectators">
                <h1> Spectators: </h1>
                {player1['spectator'].map((player, i) => <li>{player}</li>)}
            </div>
            <center>
                <div class="board">
                    {board.map((element, i)=><Board2 onClickButton={() => onClickButton(i)} element = {element} player1 = {player1} player2 = {player2}/>)} 
                </div>
                <div class="fontSize">
                    <b>{rank}</b>
                </div>
                {player2 == player1["O"] && <button onClick = {boardReset} class="button button1">Reset</button>}
                {player2 == player1["X"] && <button onClick = {boardReset} class="button button1">Reset</button>}
            </center>
        </div>
    )
}