const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  let greeter;
  beforeEach(async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();
  });

  it("Should return the new greeting once it's changed", async function () {
    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });

  it("Should return 5 when call add with 2, 3", async function () {
    expect(await greeter.add(2, 3)).to.equal(5);
  });

  it("Should return 1 when call sub with 2, 3", async function () {
    expect(await greeter.sub(2, 3)).to.equal(-1);
  });

  it("Should return 6 when testSumArray", async function () {
    expect(await greeter.testSumArray()).to.equal(true);
  });
});
