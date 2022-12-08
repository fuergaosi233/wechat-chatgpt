import * as dotenv from "dotenv";
import { parse } from "yaml";
import fs from "fs";
import { IConfig, IAccount } from "./interface";
const file = fs.readFileSync("./config.yaml", "utf8");
const configFile = parse(file);
dotenv.config();
export const config: IConfig = {
  chatGPTAccountPool: configFile.chatGPTAccountPool as Array<IAccount>,
  chatGptRetryTimes:
    configFile.chatGptRetryTimes ||
    Number(process.env.CHAT_GPT_RETRY_TIMES) ||
    3,
};
