import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom'; // Import useHistory for navigation
import Web3 from 'web3';
import UserRegistration from '../contracts/UserRegistration.json';

const web3 = new Web3(Web3.givenProvider);
const UserRegistrationABI = UserRegistration.abi;
const contractAddress = '0x65987e20Ae63E1256A4FE68a096e3FB7f0c657dC';
const contractInstance = new web3.eth.Contract(UserRegistrationABI, contractAddress);


const Login = () => {
    const navigate=useNavigate() ;
     const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userInfo, setUserInfo] = useState(null);

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

  const handleLogin = async () => {
    try {
      const user = await contractInstance.methods.usersList(email).call();
      if (user.email === email && user.password === password) {
        setUserInfo(user);
        navigate('/attribute-verification'); // Redirect to attribute verification page
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <>
      <div className="login-form">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {userInfo && (
          <div>
            <h2>User Info</h2>
            <p>Username: {userInfo.username}</p>
            <p>Email: {userInfo.email}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
