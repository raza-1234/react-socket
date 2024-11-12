import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({socket}) => {

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();

  useEffect(() => {
   if (!userInfo?.userName) return navigate('/');

   socket.emit('new_user', {
    userName: userInfo.userName,
    socketId: socket.id,
   })
  }, [userInfo])

  return (
    <>
      <div className="chat">
        <ChatBar socket = {socket}/>
        <div className="chat__main">
          <ChatBody socket = {socket}/>
          <ChatFooter socket = {socket}/>
        </div>
      </div>
    </>
  );
};

export default ChatPage;