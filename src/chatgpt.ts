import { ChatGPTAPI, ChatGPTConversation } from "chatgpt";
import { Message } from "wechaty";
import { config } from "./config.js";
import { execa } from "execa";
import { Cache } from "./cache.js";
import { ContactInterface, RoomInterface } from "wechaty/impls";
import {string} from "yaml/dist/schema/common/string";

const SINGLE_MESSAGE_MAX_SIZE = 500;
export class ChatGPTBot {
  // Record talkid with conversation id
  conversations = new Map<string, ChatGPTConversation>();
  chatGPTPools: Array<ChatGPTAPI> | [] = [];
  botConfig: Record<string,string> = {
      trigger_keywords:""
  };

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
    config.botConfig.forEach((item: { [key: string]: string; }) => {
        Object.assign(this.botConfig, item)
    });
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
  resetConversation(talkerId: string): void {
    const chatgpt = this.chatgpt;
    this.conversations.set(talkerId, chatgpt.getConversation());
  }
  getConversation(talkerId: string): ChatGPTConversation {
    const chatgpt = this.chatgpt;
    if (this.conversations.get(talkerId) !== undefined) {
      return this.conversations.get(talkerId) as ChatGPTConversation;
    }
    const conversation = chatgpt.getConversation();
    this.conversations.set(talkerId, conversation);
    return conversation;
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
  async getGPTMessage(text: string, talkerId: string): Promise<string> {
    const conversation = this.getConversation(talkerId);
    try {
      return await conversation.sendMessage(text);
    } catch (e) {
      this.resetConversation(talkerId);
      console.error(e);
      return String(e);
    }
  }
  // The message is segmented according to its size
  async trySay(
    talker: RoomInterface | ContactInterface,
    mesasge: string
  ): Promise<void> {
    const messages: Array<string> = [];
    let message = mesasge;
    while (message.length > SINGLE_MESSAGE_MAX_SIZE) {
      messages.push(message.slice(0, SINGLE_MESSAGE_MAX_SIZE));
      message = message.slice(SINGLE_MESSAGE_MAX_SIZE);
    }
    messages.push(message);
    for (const msg of messages) {
      await talker.say(msg);
    }
  }
  async onMessage(message: Message) {
    const talker = message.talker();
    if (talker.self() || message.type() > 10 || talker.name() == "微信团队") {
      return;
    }
    const text = message.text();
    const room = message.room();
    if (!room) {
      let canSend = false;
      let trigger_keywords = this.botConfig.trigger_keywords
      if(trigger_keywords){
          if(text.indexOf(trigger_keywords) == 0){
              //only if the keywords appear in the first position will they trigger a response
              console.log(`🎯 Hit GPT Enabled User by Trigger keywords:${trigger_keywords} , User:${talker.name()}`);
              canSend = true
          }
      }else{
          console.log(`🎯 Hit GPT Enabled User: ${talker.name()}`);
          canSend = true
      }

      if(canSend){
          const response = await this.getGPTMessage(text, talker.id);
          await this.trySay(talker, response);
      }
      return;
    }
    let realText = this.cleanMessage(text);
    // The bot should reply mention message
    if (!realText.includes(`@${this.botName}`)) {
      return;
    }
    realText = text.replace(`@${this.botName}`, "");
    const topic = await room.topic();
    console.debug(
      `receive message: ${realText} from ${talker.name()} in ${topic}, room: ${
        room.id
      }`
    );
    console.log(`Hit GPT Enabled Group: ${topic} in room: ${room.id}`);
    const response = await this.getGPTMessage(realText, talker.id);
    const result = `${realText}\n ------\n ${response}`;
    await this.trySay(room, result);
  }
}
