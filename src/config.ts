import * as dotenv from "dotenv";
import { parse, stringify } from "yaml";
import fs from "fs";
const file = fs.readFileSync("./config.yaml", "utf8");
const configFile = parse(file);
dotenv.config();
export const config = {
  chatGPTAccountPool: configFile.chatGPTAccountPool,
};
