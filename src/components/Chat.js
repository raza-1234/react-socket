import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeaders';
import GapShapDashboard from './GapShapDashboard';

const ChatPage = ({socket}) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [singleChatPartner, setSingleChatPartner] = useState('');
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
        <ChatBar socket = {socket} setSingleChatPartner = {setSingleChatPartner}/>
        <div className='chat__dashboard'>
          <ChatHeader 
            socket={socket} 
            singleChatPartner = {singleChatPartner} 
            setSingleChatPartner = {setSingleChatPartner}
          />
          {
            singleChatPartner ?
              <div className="chat__main">
                <ChatBody socket = {socket}/>
                <ChatFooter socket = {socket} singleChatPartner={singleChatPartner}/>
              </div>
            :<GapShapDashboard/>
          }
        </div>
      </div>
    </>
  );
};

export default ChatPage;