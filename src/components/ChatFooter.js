import React, { useState } from 'react';

const ChatFooter = ({socket}) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return false;

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    socket.emit('messgae', {
      message: message,
      userName: userInfo?.userName,
      userId: userInfo?.userId,
      socketId: socket.id
    })

    setMessage('');
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
