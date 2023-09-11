// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract FakeMedia is ERC721 {
    uint256 private s_tokenCounter;
    mapping(uint256 => string) private tokenMediaURLs;
    event mediaMinted(uint256 indexed tokenId, string mediaURI);

    constructor() ERC721("FakeMedia", "FM") {
        s_tokenCounter = 0;
    }

    function mintNft(string memory mediaURI) public {
        _safeMint(msg.sender, s_tokenCounter);
        tokenMediaURLs[s_tokenCounter] = mediaURI;
        emit mediaMinted(s_tokenCounter, mediaURI);
        s_tokenCounter++;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        return tokenMediaURLs[tokenId];
    }
}
