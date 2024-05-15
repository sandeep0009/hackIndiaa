import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar';

const Home = () => {
  const history = useNavigate(); 


  const handleClick = () => {
    history.push('/registration'); }
  return (
    <div>

      <div className="hero-section">
        <img src="../images/1.webp" alt="" className='hero-section-image' />

        <div className="hero-content">
          <div className="welcome-message">Welcome to Privacy Id Vault</div>
          <p className="hero-text">
            This is a secure platform for managing your private information and identity verification.
            Feel free to explore and experience the privacy and security we offer.
          </p>
          <button onClick={handleClick} className='btn-home'>Click to Start</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
