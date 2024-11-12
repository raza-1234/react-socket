import { Routes, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';

import Home from './components/Home';
import ChatPage from './components/Chat';

const socket = socketIO.connect('http://localhost:3001');

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
      </Routes>
    </>
  );
}

export default App;
