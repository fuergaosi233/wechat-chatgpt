import { ChatGPTAPI } from "chatgpt";
import { Message } from "wechaty";
import { config } from "./config.js";
import * as uuid from "uuid";
import { execa } from "execa";
import { Cache } from "./cache.js";

export class ChatGPTBot {
  // Record talkid with conversation id
  conversations = new Map<string, string>();
  chatGPTPools: Array<ChatGPTAPI> | [] = [];
  cache = new Cache("cache.json");
  botName: string = "";
  setBotName(botName: string) {
    this.botName = botName;
  }
  async getSessionToken(email: string, password: string): Promise<string> {
    if (this.cache.get(email)) {
      return this.cache.get(email);
    }
    const cmd = `poetry run python3 src/generate_session.py ${email} ${password}`;
    const { stdout, stderr, exitCode } = await execa(`sh`, ["-c", cmd]);
    if (exitCode !== 0) {
      console.error(stderr);
      return "";
    }
    // The last line in stdout is the session token
    const lines = stdout.split("\n");
    if (lines.length > 0) {
      this.cache.set(email, lines[lines.length - 1]);
      return lines[lines.length - 1];
    }
    return "";
  }
  async startGPTBot() {
    const chatGPTPools = (
      await Promise.all(
        config.chatGPTAccountPool.map(
          async (account: {
            email?: string;
            password?: string;
            session_token?: string;
          }): Promise<string> => {
            if (account.session_token) {
              return account.session_token;
            } else if (account.email && account.password) {
              return await this.getSessionToken(
                account.email,
                account.password
              );
            } else {
              return "";
            }
          }
        )
      )
    )
      .filter((token: string) => token !== "")
      .map((token: string) => {
        return new ChatGPTAPI({
          sessionToken: token,
        });
      });
    console.log(`Chatgpt pool size: ${chatGPTPools.length}`);
    this.chatGPTPools = chatGPTPools;
  }
  get chatgpt(): ChatGPTAPI {
    if (this.chatGPTPools.length === 0) {
      throw new Error("No chatgpt session token");
    } else if (this.chatGPTPools.length === 1) {
      return this.chatGPTPools[0];
    }
    const index = Math.floor(Math.random() * this.chatGPTPools.length);
    return this.chatGPTPools[index];
  }
  resetConversationID(talkerId: string): void {
    this.conversations.set(talkerId, uuid.v4());
  }
  getConversationID(talkerId: string): string {
    if (this.conversations.get(talkerId)) {
      return this.conversations.get(talkerId) as string;
    }
    const conversationId = uuid.v4();
    this.conversations.set(talkerId, conversationId);
    return conversationId;
  }
  // TODO: Add reset conversation id and ping pong
  async command(): Promise<void> {}
  // remove more times conversation and mention
  cleanMessage(text: string): string {
    let realText = text;
    const item = text.split("- - - - - - - - - - - - - - -");
    if (item.length > 1) {
      realText = item[item.length - 1];
    }
    // remove more text via - - - - - - - - - - - - - - -
    return realText;
  }
  async getGPTMessage(text: string): Promise<string> {
    const chatgpt = this.chatgpt;
    try {
      return await chatgpt.sendMessage(text);
    } catch (e) {
      chatgpt.refreshAccessToken();
      console.error(e);
      return String(e);
    }
  }
  async onMessage(message: Message) {
    const talker = message.talker();
    if (talker.self()) {
      return;
    }
    const text = message.text();
    const room = message.room();
    if (!room) {
      console.log(`Hit GPT Enabled User: ${talker.name()}`);
      const response = await this.getGPTMessage(text);
      await talker.say(response);
      return;
    }
    let realText = this.cleanMessage(text);
    // The bot should reply mention message
    if (!realText.includes(`@${this.botName}`)) {
      return;
    }
    realText = text.replace("@🍍", "");
    const topic = await room.topic();
    console.debug(
      `receive message: ${realText} from ${talker.name()} in ${topic}, room: ${
        room.id
      }`
    );
    console.log(`Hit GPT Enabled Group: ${topic} in room: ${room.id}`);
    const response = await this.getGPTMessage(realText);
    const result = `${realText}\n ------\n ${response}`;
    await room.say(result, talker);
  }
}
