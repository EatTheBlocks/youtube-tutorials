const { config } = require('dotenv');
const { SDK, Auth, TEMPLATES, Metadata } = require('@infura/sdk');
config();
const nftAddress = 'your nft address here';

const ipfsToUrl = ipfsString => (
  `https://ipfs.io/ipfs/${ipfsString.split('//')[1]}`
);

const auth = new Auth({
      projectId: process.env.INFURA_API_KEY,
      secretId: process.env.INFURA_API_KEY_SECRET,
      privateKey: process.env.WALLET_PRIVATE_KEY,
      chainId: 11155111 ,
      ipfs: {
        projectId: process.env.INFURA_IPFS_PROJECT_ID,
        apiKeySecret: process.env.INFURA_IPFS_PROJECT_SECRET,
      },
});
const sdk = new SDK(auth);

const init = async () => {
  const imageUrl = await sdk.storeFile({
    metadata: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/d2b070113024273.601fe7d5a2cde.jpg' 
  });
  const tokenMetadata = await Metadata.openSeaTokenLevelStandard({
    name: 'Mordor sword',
    description: 'This sword was forged in mount doom, and will give its owner super strong powers',
    image: ipfsToUrl(imageUrl), 
    external_link: 'https://blockchaingame.xyz',
    attributes: []
  });
  const metadataUrl = await sdk.storeMetadata({
    metadata: tokenMetadata
  });
  const nft = await sdk.loadContract({
    template: TEMPLATES.ERC721Mintable,
    contractAddress: nftAddress 
  });
  console.log(`Contract address is: ${nft.contractAddress}`);

  const tx = await nft.mint({
     publicAddress: process.env.WALLET_PUBLIC_ADDRESS,
     tokenURI: ipfsToUrl(metadataUrl) 
  });
  const receipt = await tx.wait();
  console.log(`Status: ${receipt.status}\n NFT minted on ${receipt.blockHash} with ${receipt.confirmations} confirmation!`);
};

init();
