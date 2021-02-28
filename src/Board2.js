import React from 'react';
import './Board.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export function Board2({onClickButton, element, player1, player2}) {
    const [access, setAccess] = useState(false)
    useEffect(() => {
        socket.on('login', (login) => {
            console.log(login)
           if (player2 == login["X"] || player2 == login["O"]){
                setAccess(true)
           }
        });
    },[]);
    function callOnClick() {
        if (access == true){
            onClickButton();
        }
    }
    return (
        <div className="box" onClick={callOnClick}>{element}
        
        </div>
    )
}