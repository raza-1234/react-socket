import React, { useEffect, useState } from 'react';

const ChatBar = ({socket}) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    socket.on('new_user_active', (users) => {
      setActiveUsers(users);
    })
  }, [socket])

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {
            activeUsers.map((user) => (
              <h3 key={user?.socketId}>
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