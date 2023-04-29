import * as dotenv from "dotenv";
dotenv.config()

export const STARTON_API_URL = "https://api.starton.io/v3/"
export const STARTON_API_KEY = process.env.STARTON_API_KEY
export const STARTON_KMS_ADDRESS = "";
export const NETWORK = "polygon-mumbai";
export const MINT_TO = "";


export const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
export const PROMPT = "A funny pixel art character";
export const SIZE = "1024x1024";