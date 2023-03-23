const { config } = require('dotenv');
const { SDK, Auth, TEMPLATES, Metadata } = require('@infura/sdk');
config();

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
    metadata: 'https://i.pinimg.com/originals/89/5b/36/895b3664a268b83128346276b61cea7b.jpg'
  });
  const collectionMetadata = Metadata.openSeaCollectionLevelStandard({
    name: 'Magic swords',
    description: 'Collection of swords of Blockchain game xyz',
    image: ipfsToUrl(imageUrl),
    external_link: 'https://blockchaingame.xyz',
  });
  console.log('collectionMetadata ----', collectionMetadata);
  const storeMetadata = await sdk.storeMetadata({ metadata: collectionMetadata });
  console.log('storeMetadata', storeMetadata);

  const newContract = await sdk.deploy({
    template: TEMPLATES.ERC721Mintable,
    params: {
      name: 'Magic swords',
      symbol: 'MASNFT',
      contractURI: ipfsToUrl(storeMetadata),
    },
  });
  console.log(`Contract address is: ${newContract.contractAddress}`);
};

init();
