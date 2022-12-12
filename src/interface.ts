import { ChatGPTConversation, ChatGPTAPI } from "chatgpt";
export interface AccountWithUserInfo {
  password: string;
  email: string;
}
export interface AccountWithSessionToken {
  session_token: string;
}
export const isAccountWithUserInfo = (
  account: IAccount
): account is AccountWithUserInfo => {
  return (
    !!(account as AccountWithUserInfo).email &&
    !!(account as AccountWithUserInfo).password
  );
};
export const isAccountWithSessionToken = (
  account: IAccount
): account is AccountWithSessionToken => {
  return !!(account as AccountWithSessionToken).session_token;
};

// Account will be one in the session token or email and password
export type IAccount = AccountWithUserInfo | AccountWithSessionToken;

export interface IChatGPTItem {
  chatGpt: ChatGPTAPI;
  account: IAccount;
}
export interface IConversationItem {
  conversation: ChatGPTConversation;
  account: IAccount;
}

export interface IConfig {
  chatGPTAccountPool: IAccount[];
  chatGptRetryTimes: number;
  chatPrivateTiggerKeyword: string;
  openAIProxy?: string;
  clearanceToken: string;
  userAgent: string;
}
