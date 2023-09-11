const { ethers } = require("hardhat")
const frontEndContractsFile = "../frontend-nextjs/my-app/constants/FakeXnetworkMapping.json"
const frontEndAbiLocation = "../frontend-nextjs/my-app/constants/"
const fs = require("fs")
module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating Frontend .......")
        await updateContractAddresses()
        await updateAbi()
    }
}
async function updateAbi() {
    const fakeMedia = await ethers.getContract("FakeMedia")
    fs.writeFileSync(
        `${frontEndAbiLocation}FakeMedia.json`,
        fakeMedia.interface.format(ethers.utils.FormatTypes.json)
    )
    console.log(`${frontEndAbiLocation}FakeMedia.json`)
}
async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    const fakeMedia = await ethers.getContract("FakeMedia")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    contractAddresses[chainId] = { FakeMedia: [fakeMedia.address] }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]
