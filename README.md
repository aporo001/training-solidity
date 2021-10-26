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
