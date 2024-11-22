import React, { useEffect, useState } from 'react';

const ChatBody = ({socket}) => {

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [recievedMessageInfo, setRecievedMessageInfo] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (payload) => {
      setRecievedMessageInfo([
        ...recievedMessageInfo,
        {
          message: payload?.message,
          userName: payload?.userName,
          userId: payload?.userId,
          socketId: payload?.socketId,
          singleChat: payload.singleChat,
          groupChat: payload.groupChat
        }
      ])
    })
  }, [socket, recievedMessageInfo])

  return (
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
  );
};

export default ChatBody;