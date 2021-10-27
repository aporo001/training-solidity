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
