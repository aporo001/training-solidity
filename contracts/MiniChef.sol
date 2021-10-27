// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MiniChef is Ownable {
  using SafeMath for uint256;

  IERC20 private _fullteamToken;

  mapping(address => uint256) private userAmount;

  constructor(address fullteamTokenAddr) {
    _fullteamToken = IERC20(fullteamTokenAddr);
  }

  function depositBalance(address user) view public returns(uint256) {
    return userAmount[user];
  }

  function deposit(uint256 amount) public {
    _fullteamToken.transferFrom(address(msg.sender), address(this), amount);
    userAmount[address(msg.sender)] = userAmount[address(msg.sender)].add(amount);
  }

  function withdrawal(uint256 amount) public {
    require(userAmount[address(msg.sender)] > 0, "invalid user balance");

    uint256 tranferAmount;
    if (userAmount[address(msg.sender)] >= amount) {
      tranferAmount = amount;
    } else {
      tranferAmount = userAmount[address(msg.sender)];
    }

    _fullteamToken.transfer(address(msg.sender), amount);
    userAmount[address(msg.sender)] = userAmount[address(msg.sender)].sub(amount);
  }
}