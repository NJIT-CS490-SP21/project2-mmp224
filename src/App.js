import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Board from './Board';
import Login from './Login';

const socket = io(); // Connects to socket connection

function App() {
  const [ent, enter] = useState(false);
  // const [player1,setPlayer] = useState({ "X": "", "O": "", "spectator": [] });
  const [player2, setPlayer2] = useState('');

  const login = (userName) => {
    setPlayer2(userName);
    enter(!ent);
    socket.emit('login', { setPlayer: userName });
  };

  useEffect(() => {
    /*
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
  */
  }, []);

  if (ent && player2 !== '') {
    return (
      <div>
        <Board player2={player2} />
      </div>
    );
  }
  return (
    <div>
      <Login login={login} />
    </div>
  );
}

export default App;
/*
function App() {
  const [messages, setMessages] = useState([]); // State variable, list of messages
  const inputRef = useRef(null); // Reference to <input> element

  function onClickButton() {
    if (inputRef != null) {
      const message = inputRef.current.value;
      // If your own client sends a message, we add it to the list of messages to
      // render it on the UI.
      setMessages(prevMessages => [...prevMessages, message]);
      socket.emit('chat', { message: message });
    }
  }

  // The function inside useEffect is only run whenever any variable in the array
  // (passed as the second arg to useEffect) changes. Since this array is empty
  // here, then the function will only run once at the very beginning of mounting.
  useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('chat', (data) => {
      console.log('Chat event received!');
      console.log(data);
      // If the server sends a message (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
      setMessages(prevMessages => [...prevMessages, data.message]);
    });
  }, []);

  return (
    <div>
      <h1>Chat Messages</h1>
      Enter message here: <input ref={inputRef} type="text" />
      <button onClick={onClickButton}>Send</button>
      <ul>
        {messages.map((item, index) => <ListItem key={index} name={item} />)}
      </ul>
    </div>
  );
}

export default App;
*/
