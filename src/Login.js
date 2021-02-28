import './App.css';
import { ListItem } from './ListItem.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export function Login({login}){
    let player = useRef("")
    return(
        <div>
            <center>
            <h1>TIC TAC TOE</h1>
                <input ref= {player} type="text" />
                <button 
                    onClick = {() => login(player.current.value)}>Login
                </button>
            </center>
        </div>
    );
}