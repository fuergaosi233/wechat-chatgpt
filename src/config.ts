import * as dotenv from "dotenv";
dotenv.config();
import { IConfig } from "./interface";
dotenv.config();

export const config: IConfig = {
  url: process.env.SERVER_URL || "http://localhost:4000",
  chatPrivateTiggerKeyword: process.env.CHAT_PRIVATE_TRIGGER_KEYWORD || "",
};
