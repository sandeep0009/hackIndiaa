

import React, { useState } from 'react';
import AttributeVerification from "../contracts/AttributeVerification.json";
import Web3 from 'web3';
import Navbar from './Navbar';


const web3 = new Web3(Web3.givenProvider);
const AttributeVerificationABI = AttributeVerification.abi;
const contractAddress = '0xae446d2dda43E5aB14b09C948a80475bF3C2196A';
const contractInstance = new web3.eth.Contract(AttributeVerificationABI, contractAddress);

const AttributeVerifications = () => {
    const [adharNumber, setAdharNumber] = useState('');
    const [dob, setDob] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');
    const [zkpGenerated, setZkpGenerated] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerifyAttribute = async () => {
        setLoading(true);
        setError('');

        try {
            const adharHash = web3.utils.keccak256(adharNumber);
            const dobHash = web3.utils.keccak256(dob);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const fromAddress = accounts[0];
            const tx = await contractInstance.methods.verifyAttribute(adharHash, dobHash).send({ from: fromAddress });
    
            if (tx.status) {
                setVerificationStatus('Attribute verified successfully!');
                setAdharNumber('');
                setDob('');
                generateZKP(adharHash, dobHash, fromAddress); // Call ZKP generation function
            } else {
                setError('Transaction failed. Please check your transaction status in MetaMask.');
            }
        } catch (error) {
            console.error(error);
            setError('Error verifying attribute. Please check your inputs and try again.');
        } finally {
            setLoading(false);
        }
    }

    const generateZKP = async (adharHash, dobHash, userAddress) => {
        try {
            const zkpTx = await contractInstance.methods.generateZKP(adharHash, dobHash).send({ from: userAddress });
    
            if (zkpTx.status) {
                setZkpGenerated('Zero-Knowledge Proof generated successfully!');
            } else {
                setError('Error generating Zero-Knowledge Proof.');
            }
        } catch (error) {
            console.error(error);
            setError('Error generating Zero-Knowledge Proof.');
        }
    }

    return (
        <div className="form-container">
        
            <h1>Attribute Verification</h1>
            <label>Adhar Number:</label>
            <input type="text" value={adharNumber} onChange={(e) => setAdharNumber(e.target.value)} />
            <label>Date of Birth:</label>
            <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} />
            <button onClick={handleVerifyAttribute} disabled={loading}>Verify Attribute</button>
            {loading && <p className="loading">Loading...</p>}
            {verificationStatus && <p className="success">{verificationStatus}</p>}
            {zkpGenerated && <p className="success">{zkpGenerated}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default AttributeVerifications;
