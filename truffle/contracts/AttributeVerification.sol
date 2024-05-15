// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttributeVerification {
    mapping(address => mapping(bytes32 => bool)) public verifiedAttributes;

    event AttributeVerified(address indexed user, bytes32 attributeHash);
    event ZKPGenerated(address indexed user, bytes32 zkp);

    function verifyAttribute(bytes32 adharHash, bytes32 dobHash) public {
        require(!verifiedAttributes[msg.sender][adharHash], "Attribute already verified");
        verifiedAttributes[msg.sender][adharHash] = true;
        verifiedAttributes[msg.sender][dobHash] = true;

        emit AttributeVerified(msg.sender, adharHash);
        emit AttributeVerified(msg.sender, dobHash);
    }

    function isAbove18YearsOld(bytes32 dobHash) public view returns (bool) {
        uint dobTimestamp = uint(dobHash);
        uint currentTimestamp = block.timestamp;
        uint ageInSeconds = currentTimestamp - dobTimestamp;

        uint secondsInAYear = 31536000; 

    
        if (ageInSeconds < secondsInAYear) {
            return false; 
        }

        return ageInSeconds >= (18 * secondsInAYear);
    }

    function generateZKP(bytes32 adharHash, bytes32 dobHash) public {
        require(verifiedAttributes[msg.sender][adharHash], "Attribute not verified");
        require(verifiedAttributes[msg.sender][dobHash], "Attribute not verified");

    
        bytes32 zkp = keccak256(abi.encodePacked(msg.sender, adharHash, dobHash));

        emit ZKPGenerated(msg.sender, zkp);
    }
}
