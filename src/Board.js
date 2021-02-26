import React from 'react';
import './Board.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {Board2} from './Board2.js';

const socket = io();

export function Board() {
    const [board, setBoard] = useState(Array(9).fill(null));
    let [either, post] = useState(true);
    
    function onClickButton(i){
        let tap
        tap = [...board]
        if(!tap[i]) {
            if (either === true) {
                tap[i] = "X"
                post(false)
            }
            else {
                tap[i] = "O"
                post(true)
            }
        }
        setBoard(tap)
        socket.emit('click', {tap : tap, post : either});
    }
    useEffect(() => {
    socket.on('click', (data) => {
      console.log('Click event received!');
      console.log(data);
      setBoard([...data.tap]);
      post(!data.post)
      });
    }, []);
    
    const boardReset = ()=> {
        setBoard(board.map((element)=>element=""))
    }
      
    return (
        <div>
            <div class="board">
                {board.map((element, i)=><Board2 onClickButton={() => onClickButton(i)} element = {element}/>)} 
            </div>
            <div>
                <button onClick = {boardReset} type="button">Reset </button>
            </div>
        </div>
    )
    
}