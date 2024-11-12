import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({socket}) => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [recievedMessageInfo, setRecievedMessageInfo] = useState([]);

  const handleLeaveChat = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  useEffect(() => {
    socket.on("messageResponse", (payload) => {
      setRecievedMessageInfo([
        ...recievedMessageInfo,
        {
          message: payload?.message,
          userName: payload?.userName,
          userId: payload?.userId,
          socketId: payload?.socketId
        }
      ])
    })
  }, [socket, recievedMessageInfo])

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {
          recievedMessageInfo?.map((messageInfo, index) => (
            <div key={messageInfo.socketId}>
              {
                messageInfo?.userName === userInfo?.userName ?
                <div className="message__chats">
                  <div className="message__sender">
                    <h5>You</h5>
                    <p>{messageInfo.message}</p>
                  </div>
                </div>
                :
                <div className="message__chats">
                  <div className="message__recipient">
                    <div>
                      <h5>{messageInfo.userName}</h5>
                      <p>{messageInfo.message}</p>
                    </div>
                  </div>
                </div>
              }
            </div>
          ))
        }
      </div>

      {/*This is triggered when a user is typing*/}
      <div className="message__status">
        <p>Someone is typing...</p>
      </div>
    </>
  );
};

export default ChatBody;