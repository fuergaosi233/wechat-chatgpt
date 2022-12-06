import * as dotenv from "dotenv";
import { parse, stringify } from "yaml";
import fs from "fs";
const file = fs.readFileSync("./config.yaml", "utf8");
const configFile = parse(file);
dotenv.config();
export const config = {
  chatgptPool: process.env.CHATGPT_POOL?.split(",") || [],
  chatGPTAccountPool: configFile.chatGPTAccountPool,
  generatorFile: `generate_session.py`,
};
