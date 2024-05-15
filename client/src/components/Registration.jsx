import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import UserRegistration from '../contracts/UserRegistration.json';

const web3 = new Web3(Web3.givenProvider);
const UserRegistrationABI = UserRegistration.abi;
const contractAddress = '0x3b660EC796C4935DA920D113B15c646981AF3bCA'; 
const contractInstance = new web3.eth.Contract(UserRegistrationABI, contractAddress);

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    async function init() {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3.eth.defaultAccount = accounts[0];
        setUserAddress(accounts[0]);
        console.log('User address:', accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    }
    init();
  }, []);

  const registerUser = async () => {
    await contractInstance.methods.createUser(name, email, password).send({ from: web3.eth.defaultAccount });
    getUserInfo();
  };

  const getUserInfo = async () => {
    if (!web3.utils.isAddress(userAddress)) {
      console.error('Invalid Ethereum address');
      return;
    }
    const user = await contractInstance.methods.getUserInfo(userAddress).call();
    setUserInfo(user);
  };

  return (
    <>
    
    <div className="registration">
      <h1>User Registration</h1>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="User Address" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
      <button onClick={registerUser}>Register</button>
    
    </div>
    </>
  );
}

export default Registration;
