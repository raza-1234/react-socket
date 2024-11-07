import React, {useState, useEffect} from "react";
import io from "socket.io-client";

const socket = io.connect('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('');
  const [recievedMessage, setRecievedMessage] = useState('');

  const changeHandler = (evt) => {
    setMessage(evt.target.value);
  }

  const clickHandler = () => {
    socket.emit("send-user-message", {room, message})
  }

  const roomHandler = () => {
    socket.emit('join_room_space', room)
  }

  useEffect(() => {
    socket.on("recieved-message", (data) => {
      setRecievedMessage(data)
    })
  }, [socket])

  return (
    <div className="App">
      <input calue={room} onChange={(evt) => setRoom(evt.target.value)} placeholder="Enter Room"/>
      <button onClick={roomHandler}>Room Selected</button>
      <br/>
      <br/>
      <input value={message} placeholder="Enter Message" onChange={changeHandler}/>
      <button onClick={clickHandler}>Send Message</button>
      <h2>Message For You</h2>
      <h4>{recievedMessage}</h4>
    </div>
  );
}

export default App;
