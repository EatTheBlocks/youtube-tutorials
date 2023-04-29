import axios from "axios";
import {MINT_TO, STARTON_API_KEY, STARTON_API_URL, STARTON_KMS_ADDRESS} from "./0-configuration.js";

export const StartonMintLoopAsync = async (contractAddress, metadataCids, ms) => {
	metadataCids.map(async (metadataCid, i) => {
		axios.post(STARTON_API_URL + `/smart-contract/polygon-mumbai/${contractAddress}/call`, {
			functionName: "mint(address,string)",
			params: [
				MINT_TO,
				metadataCid,
			],
			signerWallet: STARTON_KMS_ADDRESS,
		}, {
			headers: {
				"x-api-key": STARTON_API_KEY
			}
		}).then(res=>{
			console.log("---------------------------------------------------")
			console.log(`[STARTON] - Mint ${metadataCids.length} on ${contractAddress}`)
			console.log("tx hash:", res.data.transactionHash)
			console.log("Opensea testnets link: https://testnets.opensea.io/fr/assets/mumbai/" + contractAddress + "/" + i)
		}).catch(e => console.log(e))
		await new Promise(f => setTimeout(f, ms))
	});
}

StartonMintLoopAsync(
	"0x05Fd5B0a54FbB3f1107A84CE6d5240d9d4FE7190",
	[
		"bafybeifo4gc35tptcxm4umfsfbdv7opx4mnkt67wjj4xsxgcb6mr63boje",
		"bafkreigbuhj6jr2ctpl4avifobtvutxv7lpj5gej6plzrbm3nvot2mbimi"
	],
	200)
	.then().catch(e=>console.log(e))
