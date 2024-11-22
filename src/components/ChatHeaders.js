import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';

const ChatHeader = ({socket, singleChatPartner, setSingleChatPartner}) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [messageStatus, setMessageStatus] = useState('');
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    socket.emit('chat_closed', userInfo);
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  useEffect(() => {
    socket.on('message_status_response', (data) => {
      setMessageStatus(data.messageStatus)
    })
  }, [socket])

  return (
    <header className="chat__mainHeader">
      {
        singleChatPartner?.userName ?
          <div className='user_wrapper'>
            <div className='arrow_wrapper' onClick={() => setSingleChatPartner('')}>
              <p className='arrow left'/>
            </div>
            <h4>{singleChatPartner?.userName}</h4>

            <div className="message__status">
              <p>{messageStatus}</p>
            </div>
          </div>
          :"Welcome! Let's Chat with Colleagues"
      }
      <button className="leaveChat__btn" onClick={handleLeaveChat}>
        LEAVE CHAT
      </button>
    </header>
  )
}

export default ChatHeader
