import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const generateRandomId = () => {
    return (Math.floor(Math.random() * 1000));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userInfo', JSON.stringify({
      userName: userName,
      userId: `${userName}-${generateRandomId()}`
    }));    

    if (!userName) return alert("Enter Your Name To Login.")
    navigate('/chat')
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('userInfo'))?.userName || userName){
      navigate('/chat');
    }
  }, [])

  const changeHandler = (e) => {
    setUserName(e.target.value)
  } 

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={8}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={changeHandler}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;