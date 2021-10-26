# 1. Create solidity project using hardhat

```
  mkdir training-solidity
  cd training-solodity
  npx hardhat
```

# 2. Setup solidity project, trial to deploy and verify contract

- install hardhat-deploy package

```
  npm i -D hardhat-deploy
```

- add hardhat deploy in **hardhat.config.js**

```
  require("hardhat-deploy");

  ...

  module.exports = {
    ...,

    namedAccounts: {
      deployer: {
        default: 0, // here this will by default take the first account as deploy
      },
    }
  }

```

- create folder **deploy**

- create file **00_deploy_greeter.js**

```
  module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    await deploy("Greeter", {
      from: deployer,
      args: ["Hello"],
      log: true,
    });
  };
  module.exports.tags = ["Greeter"];

```

- deploy greeter contract

```
  npx hardhat deploy --network ropsten
```

- verify contract

```
  npx hardhat --network ropsten etherscan-verify --solc-input
```

then see your contract on [link to ropsten etherscan!](https://ropsten.etherscan.io/)

# 3.Create erc20 token

- install openzeppelin package

```
  npm i -D @openzeppelin/contracts
```

- create your token smart contract in folder **contracts** name FullteamToken.sol

```
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
```

- create deploy scripts

```
const ethers = require("ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("FullteamToken", {
    from: deployer,
    args: [ethers.utils.parseEther("100000000000")],
    log: true,
  });
};
module.exports.tags = ["FullteamToken"];

```

and deploy

```
  npx hardhat deploy --tags FullteamToken --network ropsten
```

and verify

```
  npx hardhat --network ropsten etherscan-verify --solc-input
```

# 4. Create contract for deposit and withdrawal your token
