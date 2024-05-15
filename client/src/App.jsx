import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AttributeVerifications from './components/AtrributeVerification';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
    
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/attribute-verification" element={<AttributeVerifications/>}/>
        </Routes>
   
      </div>
    </BrowserRouter>
  );
}

export default App;


