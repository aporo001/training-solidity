// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FullteamToken is ERC20("Fullteam Token", "FULLTEAM"), Ownable {
    constructor(uint256 _initAmount) {
        _mint(address(msg.sender), _initAmount);
    }

    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }
} 