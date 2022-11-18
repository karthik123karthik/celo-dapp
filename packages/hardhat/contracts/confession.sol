//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
//contract address = "0x39F7489FD5fe0CF5EE2b52C48704e609c8Caf19D"
// remember to remove unnecessary imports and its use when deploying your smart contract

contract Confession {
     struct confession{
        address owner;
        string description;
        uint time;
     }

     event created(address indexed owner, string indexed description,uint timestamp);

     confession[] private arr;

     function getAllConfessions()public view returns(confession[] memory){
         return arr;
     }

     function addConfession(string memory _description)public{
         confession memory newone = confession({owner:msg.sender, description:_description, time:block.timestamp});
         arr.push(newone);
         emit created(msg.sender, _description, block.timestamp);
     }
}
