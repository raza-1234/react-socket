import React, { useState } from 'react';

const ChatFooter = ({socket, singleChatPartner}) => {
  const [message, setMessage] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return false;
    
    socket.emit('messgae', {
      message: message,
      userName: userInfo?.userName,
      userId: userInfo?.userId,
      socketId: socket.id,
      toSocketId: singleChatPartner?.socketId,
      groupChat: false,
      singleChat: true
    })

    setMessage('');
  };

  const messageStatusHandler = (value) => {
    let messageStatus = value.trim() ? 'typing ...': undefined;
    
    socket.emit('message_status', {
      userName: userInfo?.userName,
      userId: userInfo?.userId,
      socketId: socket.id,
      toSocketId: singleChatPartner?.socketId,
      groupChat: false,
      singleChat: true,
      messageStatus
    })
  }

  const changeHandler = (e) => {
    setMessage(e.target.value);

    messageStatusHandler(e.target.value);
  }

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={changeHandler}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
