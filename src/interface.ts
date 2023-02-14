import { ChatGPTAPIBrowser } from "chatgpt";
export interface AccountWithUserInfo {
  password: string;
  email: string;
  isGoogleLogin: boolean;
}

// Account will be one in the session token or email and password
export type IAccount = AccountWithUserInfo;

export interface IChatGPTItem {
  chatGpt: ChatGPTAPIBrowser;
  account: IAccount;
}
export interface IConversationItem {
  conversation: ChatGPTAPIBrowser;
  account: IAccount;
  conversationId?: string;
  messageId?: string;
}

export interface IConfig {
  chatGPTAccountPool: IAccount[];
  chatGptRetryTimes: number;
  chatPrivateTiggerKeyword: string;
  chatTiggerRule?: string;
  openAIProxy?: string;
  clearanceToken: string;
  userAgent: string;
}
