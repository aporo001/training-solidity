const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MiniChef", function () {
  let fullteamToken;
  let miniChef;
  let user1;
  before(async function () {
    const signer = await ethers.getSigners();
    user1 = signer[0];
  });

  beforeEach(async function () {
    const FullteamToken = await ethers.getContractFactory("FullteamToken");
    fullteamToken = await FullteamToken.deploy(
      ethers.utils.parseEther("100000000000")
    );
    await fullteamToken.deployed();

    const MiniChef = await ethers.getContractFactory("MiniChef");
    miniChef = await MiniChef.deploy(fullteamToken.address);
    await miniChef.deployed();

    const approveTran = await fullteamToken.approve(
      miniChef.address,
      ethers.utils.parseEther("1000")
    );
    await approveTran.wait();
  });

  it("Should return deposit balance zero when user not deposit", async function () {
    expect(await miniChef.depositBalance(user1.address)).to.equal(0);
  });

  it("Should return deposit balance correctly when user deposit", async function () {
    const depTran = await miniChef.deposit(ethers.utils.parseEther("1000"));
    await depTran.wait();

    expect(await miniChef.depositBalance(user1.address)).to.equal(
      ethers.utils.parseEther("1000")
    );
  });
});
