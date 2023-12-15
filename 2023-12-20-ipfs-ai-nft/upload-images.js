require('dotenv').config();
const request = require('request-promise');
const fs = require('fs');

async function uploadToIPFS(filePath, fileName, contentType) {
    const options = {
        method: 'POST',
        url: 'https://api.quicknode.com/ipfs/rest/v1/s3/put-object',
        headers: {
          'x-api-key': `${process.env.QUICKNODE_API_KEY}`
        },
        formData: {
          Body: {
            value: fs.createReadStream(filePath),
            options: {
              filename: '',
              contentType: null
            }
          },
          Key: fileName,
          'ContentType': contentType
        }
    };
    try {
      const response = await request(options);
      return JSON.parse(response);
    } catch(error) {
      console.error('Error uploading to IPFS:', error);
      throw error;
    };
}

function createNFTMetadata(filePath, imageUrl) {
    const name = 'NFT name';
    const description  = 'NFT description';
    const metadata = {
        name,
        description,
        image: imageUrl,
        attributes: [] // Add any additional attributes here
    };
    fs.writeFileSync(filePath, JSON.stringify(metadata));

    return metadata;
}

async function main() {
    try {
        for(let i = 0; i < 5; i++) {
            const imageName = `image_${i}.png`;
            const imagePath = `./${imageName}`;

            // Upload image
            const imageUploadResponse = await uploadToIPFS(
              imagePath, 
              imageName, 
              'image/png'
            );
            console.log('Image uploaded:', imageUploadResponse);

            // Create metadata
            const imageUrl = `https://ipfs.io/ipfs/${imageUploadResponse.pin.cid}`;
            const metadataFile = `metadata_${i}.json`;
            const metadataPath = `./${metadataFile}`;
            const metadata = createNFTMetadata(metadataPath, imageUrl);

            // Upload metadata
            const metadataUploadResponse = await uploadToIPFS(
                metadataPath,
                metadataFile,
                'application/json'
              );
            console.log('Metadata uploaded:', metadataUploadResponse);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
