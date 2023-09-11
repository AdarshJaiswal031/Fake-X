const { ethers } = require("hardhat")
const PRICE = ethers.utils.parseEther("0.1")
const gasLimit = 5000000
const TOKEN_ID = 48
async function mint() {
    const basicNft = await ethers.getContract("BasicNft")

    console.log("Minting.......")
    const mintTx = await basicNft.mintNft()
    const mintTxReceit = await mintTx.wait(1)
    const tokenId = mintTxReceit.events[0].args.tokenId
    console.log("Got tokenId : ", tokenId.toString())
    console.log("Nft Address : ", basicNft.address.toString())
}
mint()
