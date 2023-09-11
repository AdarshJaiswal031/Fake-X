const { ethers } = require("hardhat");
const PRICE=ethers.utils.parseEther("0.1")
const gasLimit = 5000000;
const TOKEN_ID=48
async function mintAndList(){
    const nftMarketplace=await ethers.getContract("NftMarketplace")
    const basicNft=await ethers.getContract("BasicNft")

    console.log("Minting.......")
    const mintTx=await basicNft.mintNft()
    const mintTxReceit=await mintTx.wait(1)
    const tokenId=mintTxReceit.events[0].args.tokenId
    console.log("Approving Nft.........")
    const approvalTx=await basicNft.approve(nftMarketplace.address,tokenId)
    await approvalTx.wait(1)
    console.log("Listing Nft........")
    const tx=await nftMarketplace.listItem(basicNft.address,tokenId,PRICE)
    await tx.wait(1)
    console.log("Listed!!")

    // console.log("removing......")
    //     const tx=await nftMarketplace.cancelListing(basicNft.address,TOKEN_ID)
    // await tx.wait(1)
    // console.log("done!!")

    // console.log("Buying......")
    // const listing=await nftMarketplace.getListing(basicNft.address,TOKEN_ID)
    // const price=listing.price.toString()
    // const tx=await nftMarketplace.buyItem(basicNft.address,TOKEN_ID,{value:price})
    // await tx.wait(1)
    // console.log("done!!")

    //     console.log("Withdrawing......")
    //     const tx=await nftMarketplace.withdrawProceeds()
    // await tx.wait(1)
    // console.log("done!!")

}
mintAndList()