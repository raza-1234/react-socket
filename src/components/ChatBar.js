import React, { useEffect, useState } from 'react';

const ChatBar = ({socket, setSingleChatPartner}) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    socket.on('new_user_active', (users) => {
      setActiveUsers(users);
    })

    socket.on('chat_closed_response', (users) => {
      setActiveUsers(users);
    })
  }, [socket])

  const chatPartner = (user) => {
    setSingleChatPartner(user);
  }

  return (
    <div className="chat__sidebar">
      <h2>Gap Shap</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {
            activeUsers.map((user) => (
              <h3 key={user?.socketId} className='single__chat__user' onClick={() => chatPartner(user)}>
                {
                  user.userName === userInfo.userName ? 'You': user.userName
                }
              </h3>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ChatBar;