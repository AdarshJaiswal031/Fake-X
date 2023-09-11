const { ethers } = require("hardhat")
const PRICE = ethers.utils.parseEther("0.1")
const gasLimit = 5000000
const TOKEN_ID = 48
async function mint() {
    const fakeMedia = await ethers.getContract("FakeMedia")

    console.log("Minting.......")
    const mintTx = await fakeMedia.mintNft("http://")
    const mintTxReceit = await mintTx.wait(1)
    const tokenId = mintTxReceit.events[0].args.tokenId
    const mediaURI = mintTxReceit.events[0].args.mediaURI
    console.log("Got tokenId : ", tokenId.toString())
    console.log("Nft Address : ", fakeMedia.address.toString())
    console.log(mintTxReceit)
    console.log("MediaURI : ", mediaURI)

    // const mediaUrl = await fakeMedia.tokenURI(1)
    // console.log(mediaUrl)
}
mint()
