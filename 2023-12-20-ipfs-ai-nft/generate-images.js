require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const generateImage = async (prompt) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt: prompt,
                n: 5, // Number of images to generate
                size: "1024x1024", // Size of the image
                response_format: "b64_json"
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
};

const saveImage = (imageData, index) => {
    const buffer = Buffer.from(imageData, 'base64');
    fs.writeFileSync(`./image_${index}.png`, buffer);
};

const main = async () => {
    const imageData = await generateImage("Cool pixel art NFT with a cyberpunk theme");
    for (let i = 0; i < 5; i++) {
        if (imageData) {
            saveImage(imageData.data[i].b64_json, i);
        }
    }
};

main();
