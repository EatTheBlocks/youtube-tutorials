# Starton x EatTheBlock.

Packages installation
```
yarn install
```

Go on app.starton.io and create an api-key https://docs.starton.io/docs/getting-started

Create a .env file copying env.example and filling the values with starton api-key and openAI api-key

Then create a starton kms on the dashboard following those steps and fill it with faucets following this link https://docs.starton.io/docs/Wallet/creating-a-wallet

At each steps you can go on the dashborad to see results visually on https://app.starton.io

## 0-configuration.ts

Replace ``STARTON_KMS_ADDRESS`` with the wallet address you just created and ``MINT_TO`` by the destination mint address
You can change ``NETWORK`` as defined here: https://docs.starton.io/docs/overview#supported-networks but we chose ``"polygon-mumbai"`` for opensea generation link. you can also edit generation link on ``3-mint-processus.ts``
You can change ``PROMPT`` value to generate other kind of images.

## 1-upload-generation-on-ipfs.ts

This Script will generate image on openAI, and store the image result on ipfs with startonAPI.
It will also generate nft Metadata from the prompt input.

launch:
```
ts-node 1-upload-generation-on-ipfs.ts
```
expected output:
```
[OPEN AI]	image generation
[OPEN AI]	extractPictureBuffers
[STARTON]	uploading image on ipfs
IMAGE CID: bafybeibsv6nfrj35axihzbbf6caxncsyxdxc4wzxobftudomd6srbdb4zy
[STARTON]	create and upload nft metadata on ipfs
METADATA CID bafkreigo72zjfs72ulw3vgatahvpptw2woe45zomtxjl7ddjvdp6lvyeqe
```

You can go on the dashboard in storage section to see the uploads.

## 2-ERC721-deployment.ts

This script will generate and upload to ipfs contract-level metadata, will deploy ERC-721 smart contract on the chosen network.
You can take IMAGE cid from the previous output and replace parameters at the end of the file with ipfs cid.

```js
ERC721deploy("bafybeibsv6nfrj35axihzbbf6caxncsyxdxc4wzxobftudomd6srbdb4zy").then().catch(e=>console.log(e))
```

launch
```
ts-node 2-ERC721-deployment.ts
```
expected output:
```
[STARTON] - CONTRACT ADDRESS: 0xAD46470D10ae1102816034c4e197E0083f154496
tx hash: 0x7eac5a27147823c30826a1de4a46d57cdecc7316eb71ef536d3d0cb224e0ac75
```

## 3-mint-processus.ts

This script will loop mint calling an ERC721 smart contract on starton. To launch it properly pass contract address from ``2-ERC721-deployment.ts`` output
for the first parameter.
the second parameter is the nft metadata cid generated on the script ``1-upload-generation-on-ipfs.ts``
the third parameter is the number of mint you want to make
the last one is the latency between each calls in milliseconds. Be careful, you could hit our API rate-limits.
You can change the output depending on the marketplace or if you want perform this on mainnet.

This process shows our relayer performances. This includes nonce management, gas price strategy and more. Checkout the following ressources for more informations:
- https://docs.starton.io/docs/Transactions/understanding-the-relayer
- https://docs.starton.io/blog/blockchain-transaction-lifecycle
- https://docs.starton.io/intro#tag/SettingRelayer

```js
StartonMintLoopAsync(
    "0xAD46470D10ae1102816034c4e197E0083f154496",
    "bafkreigo72zjfs72ulw3vgatahvpptw2woe45zomtxjl7ddjvdp6lvyeqe",
    10,
    200)
    .then().catch(e=>console.log(e))
```

launch
```
ts-node 3-ERC721-deployment.ts
```
expected output:
```
---------------------------------------------------
[STARTON] - Mint 0 on 0xAD46470D10ae1102816034c4e197E0083f154496
tx hash: 0x840287505aac092dbf67fef7e7e4b57e045660f7fd419313fce6c75559fb9cf9
Opensea testnets link: https://testnets.opensea.io/fr/assets/mumbai/0xAD46470D10ae1102816034c4e197E0083f154496/0
---------------------------------------------------
[STARTON] - Mint 2 on 0xAD46470D10ae1102816034c4e197E0083f154496
tx hash: 0xd84f52ab2befec46fe21235f1b41669532a78499ad7871393a17b2b191a8cbc2
Opensea testnets link: https://testnets.opensea.io/fr/assets/mumbai/0xAD46470D10ae1102816034c4e197E0083f154496/2
---------------------------------------------------
[STARTON] - Mint 1 on 0xAD46470D10ae1102816034c4e197E0083f154496
tx hash: 0xde6ed043bcf5df603854e5bb38c9dd36e76201e9347a83f6df149c7dc33710e1
Opensea testnets link: https://testnets.opensea.io/fr/assets/mumbai/0xAD46470D10ae1102816034c4e197E0083f154496/1
---------------------------------------------------
[STARTON] - Mint 4 on 0xAD46470D10ae1102816034c4e197E0083f154496
tx hash: 0x5d79f70fe010b39632ed95cdc1766a146acbaaec4d57379e28cd72c8a828d51b
Opensea testnets link: https://testnets.opensea.io/fr/assets/mumbai/0xAD46470D10ae1102816034c4e197E0083f154496/4
---------------------------------------------------
[STARTON] - Mint 3 on 0xAD46470D10ae1102816034c4e197E0083f154496
tx hash: 0x33ce4d03a32c23793ac10f74117201b7666a028a0dd476d21909da03c8f6968e
Opensea testnets link: https://testnets.opensea.io/fr/assets/mumbai/0xAD46470D10ae1102816034c4e197E0083f154496/3
---------------------------------------------------
[STARTON] - Mint 6 on 0xAD46470D10ae1102816034c4e197E0083f154496
tx hash: 0x1ceae5ace129c1a570bf9b07744e9fcc69bbbdfabacb44a047b3c685483c03de
Opensea testnets link: https://testnets.opensea.io/fr/assets/mumbai/0xAD46470D10ae1102816034c4e197E0083f154496/6
---------------------------------------------------
[STARTON] - Mint 5 on 0xAD46470D10ae1102816034c4e197E0083f154496
tx hash: 0xeb2f9dc8796ef18618b48cf2e88ec25f06f5696c931ff8c9a1a3e9a09ed213a7
Opensea testnets link: https://testnets.opensea.io/fr/assets/mumbai/0xAD46470D10ae1102816034c4e197E0083f154496/5
---------------------------------------------------
[STARTON] - Mint 7 on 0xAD46470D10ae1102816034c4e197E0083f154496
tx hash: 0x459ed7516bf0605017f52aeb9baa5db0f9f5756e451a220ee7b66c05f5a59b0a
Opensea testnets link: https://testnets.opensea.io/fr/assets/mumbai/0xAD46470D10ae1102816034c4e197E0083f154496/7
---------------------------------------------------
[STARTON] - Mint 8 on 0xAD46470D10ae1102816034c4e197E0083f154496
tx hash: 0xba83872b940669ea6392cd4e811b6858feabc6b9fc4b780f35f440ef8a0f792b
Opensea testnets link: https://testnets.opensea.io/fr/assets/mumbai/0xAD46470D10ae1102816034c4e197E0083f154496/8
---------------------------------------------------
[STARTON] - Mint 9 on 0xAD46470D10ae1102816034c4e197E0083f154496
tx hash: 0xd1ec05000387714e7e2f36f85784a921f311b3f0f1a6e472bb02a0f8bb612b46
Opensea testnets link: https://testnets.opensea.io/fr/assets/mumbai/0xAD46470D10ae1102816034c4e197E0083f154496/9
```