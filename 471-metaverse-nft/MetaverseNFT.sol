pragma solidity ^0.8.10;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol';

contract MetaverseNFT is ERC721 {
    uint public nextTokenId;
    constructor() ERC721('Land', 'LAND') {}

    function _baseURI() internal pure override returns(string memory) {
        return 'https://https/path/to/metadata.server';
    }

    function mint() external payable {
        require(msg.value == 1 ether);
        require(nextTokenId < 10000);
        _safeMint(msg.sender, nextTokenId);
        nextTokenId++;
    }
}
