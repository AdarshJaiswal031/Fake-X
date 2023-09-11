const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config.js");
const { verify } = require("../utils/verify");

module.exports = async function ({ getNamedAccounts, deployments, ethers }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log("--------------------------------");
    const args = [];

    // Specify gas price and gas limit
    const overrides = {
        gasPrice: ethers.utils.parseUnits("20", "gwei"), // Adjust the gas price as needed
        gasLimit: 4000000, // Adjust the gas limit as needed
    };

    const fakeMedia = await deploy("FakeMedia", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
        overrides, // Apply the gas price and gas limit
    });

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying..........");
        await verify(fakeMedia.address, args);
    }

    log("---------------------------------");
};

module.exports.tags = ["all", "fakeMedia", "main"];
