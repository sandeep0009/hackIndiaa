// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract UserRegistration {
    struct User {
        string name;
        uint256 age;
        address walletAddress;
        bool registered;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed user, string name, uint256 age);

    function registerUser(string memory _name, uint256 _age) public {
        require(!users[msg.sender].registered, "User already registered");

        users[msg.sender] = User(_name, _age, msg.sender, true);

        emit UserRegistered(msg.sender, _name, _age);
    }

    function getUserInfo(address _user) public view returns (string memory, uint256) {
        return (users[_user].name, users[_user].age);
    }
}
