module.exports = async ({ ethers, getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const fullteamToken = await ethers.getContract("FullteamToken");
  await deploy("MiniChef", {
    from: deployer,
    args: [fullteamToken.address],
    log: true,
  });
};
module.exports.tags = ["MiniChef"];
