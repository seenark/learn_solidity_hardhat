// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;

    event NewWave(address indexed from, uint256 timestmap, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;
    mapping(address => uint256) public lastWaveAt;

    constructor() payable {
        console.log(
            "Hi I am a contract and I am smart but you are very smarter than me because you made me"
        );
    }

    function wave(string memory _message) public {
        require(
            lastWaveAt[msg.sender] + 30 seconds < block.timestamp,
            "Wait 15 minutes"
        );
        lastWaveAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);

        //Generate Psudo random
        uint256 randomNumber = (block.difficulty + block.timestamp + seed) %
            100;
        console.log("Random # generated: %s", randomNumber);

        seed = randomNumber;
        if (randomNumber < 50) {
            console.log("%s won", msg.sender);
            uint256 priceAmount = 0.0001 ether;
            require(
                priceAmount <= address(this).balance,
                "try to withdraw more money than you has."
            );
            (bool success, ) = (msg.sender).call{value: priceAmount}("");
            require(success, "Failed to withdraw money");
        }
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("we have total waves: %d", totalWaves);
        return totalWaves;
    }
}
