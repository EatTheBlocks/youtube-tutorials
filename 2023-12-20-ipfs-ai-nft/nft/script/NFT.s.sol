// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {Script} from "forge-std/Script.sol";
import {NFT} from "../src/NFT.sol";

contract NFTScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        NFT nft = new NFT(vm.envAddress("OWNER"));
        nft.safeMint(
          vm.envAddress("OWNER"),
          0,
          "https://ipfs.io/ipfs/QmSeZ1LnGqre7ybekaWT8Az96CwJUzrxGTM8V34fTcp7EC"
        );
        nft.safeMint(
          vm.envAddress("OWNER"),
          1,
          "https://ipfs.io/ipfs/QmSHHcceupX4aGFQnMPSBRbMQnJbuLLxVnGB5Py869VFWy"
        );
        vm.stopBroadcast();
    }
}
