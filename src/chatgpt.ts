import { ChatGPTAPI, ChatGPTAPIBrowser } from "chatgpt";

import { config } from "./config.js";
import AsyncRetry from "async-retry";
import {
  IChatGPTItem,
  IConversationItem,
  AccountWithUserInfo,
  IAccount,
} from "./interface.js";

const ErrorCode2Message: Record<string, string> = {
  "503":
    "OpenAI 服务器繁忙，请稍后再试| The OpenAI server is busy, please try again later",
  "429":
    "OpenAI 服务器限流，请稍后再试| The OpenAI server was limited, please try again later",
  "500":
    "OpenAI 服务器繁忙，请稍后再试| The OpenAI server is busy, please try again later",
  "403":
    "OpenAI 服务器拒绝访问，请稍后再试| The OpenAI server refused to access, please try again later",
  unknown: "未知错误，请看日志 | Error unknown, please see the log",
};
const Commands = ["/reset", "/help"] as const;
export class ChatGPTPool {
  chatGPTPools: Array<IChatGPTItem> | [] = [];
  conversationsPool: Map<string, IConversationItem> = new Map();
  async resetAccount(account: IAccount) {
    // Remove all conversation information
    this.conversationsPool.forEach((item, key) => {
      if ((item.account as AccountWithUserInfo)?.email === account.email) {
        this.conversationsPool.delete(key);
      }
    });
    // Relogin and generate a new session token
    const chatGPTItem = this.chatGPTPools.find(
      (
        item: any
      ): item is IChatGPTItem & {
        account: AccountWithUserInfo;
        chatGpt: ChatGPTAPI;
      } => item.account.email === account.email
    );
    if (chatGPTItem) {
      const account = chatGPTItem.account;
      try {
        chatGPTItem.chatGpt = new ChatGPTAPIBrowser({
          ...account,
          proxyServer: config.openAIProxy,
        });
      } catch (err) {
        //remove this object
        this.chatGPTPools = this.chatGPTPools.filter(
          (item) =>
            (item.account as AccountWithUserInfo)?.email !== account.email
        );
        console.error(
          `Try reset account: ${account.email} failed: ${err}, remove it from pool`
        );
      }
    }
  }
  resetConversation(talkid: string) {
    this.conversationsPool.delete(talkid);
  }
  async startPools() {
    const chatGPTPools = [];
    for (const account of config.chatGPTAccountPool) {
      const chatGpt = new ChatGPTAPIBrowser({
        ...account,
        proxyServer: config.openAIProxy,
      });
      try {
        await AsyncRetry(
          async () => {
            await chatGpt.initSession();
          },
          { retries: 3 }
        );
        chatGPTPools.push({
          chatGpt: chatGpt,
          account: account,
        });
      } catch {
        console.error(
          `Try init account: ${account.email} failed, remove it from pool`
        );
      }
    }
    // this.chatGPTPools = await Promise.all(
    //   config.chatGPTAccountPool.map(async (account) => {
    //     const chatGpt = new ChatGPTAPIBrowser({
    //       ...account,
    //       proxyServer: config.openAIProxy,
    //     });
    //     await chatGpt.initSession();
    //     return {
    //       chatGpt: chatGpt,
    //       account: account,
    //     };
    //   })
    // );
    this.chatGPTPools = chatGPTPools;
    if (this.chatGPTPools.length === 0) {
      throw new Error("⚠️ No chatgpt account in pool");
    }
    console.log(`ChatGPTPools: ${this.chatGPTPools.length}`);
  }
  async command(cmd: typeof Commands[number], talkid: string): Promise<string> {
    console.log(`command: ${cmd} talkid: ${talkid}`);
    if (cmd == "/reset") {
      this.resetConversation(talkid);
      return "♻️ 已重置对话 ｜ Conversation reset";
    }
    if (cmd == "/help") {
      return `🧾 支持的命令｜Support command：${Commands.join("，")}`;
    }
    return "❓ 未知命令｜Unknow Command";
  }
  // Randome get chatgpt item form pool
  get chatGPTAPI(): IChatGPTItem {
    return this.chatGPTPools[
      Math.floor(Math.random() * this.chatGPTPools.length)
    ];
  }
  // Randome get conversation item form pool
  getConversation(talkid: string): IConversationItem {
    if (this.conversationsPool.has(talkid)) {
      return this.conversationsPool.get(talkid) as IConversationItem;
    }
    const chatGPT = this.chatGPTAPI;
    if (!chatGPT) {
      throw new Error("⚠️ No chatgpt item in pool");
    }
    //TODO: Add conversation implementation
    const conversation = chatGPT.chatGpt;
    const conversationItem = {
      conversation,
      account: chatGPT.account,
    };
    this.conversationsPool.set(talkid, conversationItem);
    return conversationItem;
  }
  setConversation(talkid: string, conversationId: string, messageId: string) {
    const conversationItem = this.getConversation(talkid);
    this.conversationsPool.set(talkid, {
      ...conversationItem,
      conversationId,
      messageId,
    });
  }
  // send message with talkid
  async sendMessage(message: string, talkid: string): Promise<string> {
    if (
      Commands.some((cmd) => {
        return message.startsWith(cmd);
      })
    ) {
      return this.command(message as typeof Commands[number], talkid);
    }
    const conversationItem = this.getConversation(talkid);
    const { conversation, account, conversationId, messageId } =
      conversationItem;
    try {
      // TODO: Add Retry logic
      const {
        response,
        conversationId: newConversationId,
        messageId: newMessageId,
      } = await conversation.sendMessage(message, {
        conversationId,
        parentMessageId: messageId,
      });
      // Update conversation information
      this.setConversation(talkid, newConversationId, newMessageId);
      return response;
    } catch (err: any) {
      if (err.message.includes("ChatGPT failed to refresh auth token")) {
        // If refresh token failed, we will remove the conversation from pool
        await this.resetAccount(account);
        console.log(`Refresh token failed, account ${JSON.stringify(account)}`);
        return this.sendMessage(message, talkid);
      }
      console.error(
        `err is ${err.message}, account ${JSON.stringify(account)}`
      );
      // If send message failed, we will remove the conversation from pool
      this.conversationsPool.delete(talkid);
      // Retry
      return this.error2msg(err);
    }
  }
  // Make error code to more human readable message.
  error2msg(err: Error): string {
    for (const code in ErrorCode2Message) {
      if (err.message.includes(code)) {
        return ErrorCode2Message[code];
      }
    }
    return ErrorCode2Message.unknown;
  }
}
