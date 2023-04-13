import { config } from "./config.js";
import {ContactImpl, ContactInterface, RoomImpl, RoomInterface} from "wechaty/impls";
import { Message } from "wechaty";
import {FileBox} from "file-box";
import {chatgpt, dalle, whisper} from "./openai.js";
import DBUtils from "./data.js";
import { regexpEncode } from "./utils.js";
import { commander } from "./commander.js";

enum MessageType {
  Unknown = 0,
  Attachment = 1, // Attach(6),
  Audio = 2, // Audio(1), Voice(34)
  Contact = 3, // ShareCard(42)
  ChatHistory = 4, // ChatHistory(19)
  Emoticon = 5, // Sticker: Emoticon(15), Emoticon(47)
  Image = 6, // Img(2), Image(3)
  Text = 7, // Text(1)
  Location = 8, // Location(48)
  MiniProgram = 9, // MiniProgram(33)
  GroupNote = 10, // GroupNote(53)
  Transfer = 11, // Transfers(2000)
  RedEnvelope = 12, // RedEnvelopes(2001)
  Recalled = 13, // Recalled(10002)
  Url = 14, // Url(5)
  Video = 15, // Video(4), Video(43)
  Post = 16, // Moment, Channel, Tweet, etc
}
const SINGLE_MESSAGE_MAX_SIZE = 500;
type Speaker = RoomImpl | ContactImpl;

export class ChatGPTBot {
  chatPrivateTriggerKeyword = config.chatPrivateTriggerKeyword;
  chatTriggerRule = config.chatTriggerRule? new RegExp(config.chatTriggerRule): undefined;
  disableGroupMessage = config.disableGroupMessage || false;
  botName: string = "";

  constructor() {
    commander.addHelpText("/img <关键词>\n# 根据关键词生成图片");

    commander.addCommand({
      names: ["prompt", "setPrompt", "设置提示词"],
      params: ["<PROMPT>"],
      description: "设置 Ai 提示词",
      handler: async (talker: Speaker, prompt: string) => {
        if (!prompt) {
          return "提示词不能为空！\n\n命令格式：\n/cmd prompt <PROMPT>";
        }
        const talkerName = talker instanceof RoomImpl ? await talker.topic() : talker.name();
        DBUtils.setPrompt(talkerName, prompt);
        return "已更新提示词。";
      }
    });

    commander.addCommand({
      names: ["clear", "清除记录", "清空记录"],
      description: "清除名下所有对话记录",
      handler: async (talker: Speaker) => {
        const talkerName = talker instanceof RoomImpl ? await talker.topic() : talker.name();
        DBUtils.clearHistory(talkerName);
        return "已清除名下所有对话记录。";
      }
    });
  }

  setBotName(botName: string) {
    this.botName = botName;
  }
  get chatGroupTriggerRegEx(): RegExp {
    return new RegExp(`^@${regexpEncode(this.botName)}\\s`);
  }
  get chatPrivateTriggerRule(): RegExp | undefined {
    const { chatPrivateTriggerKeyword, chatTriggerRule } = this;
    let regEx = chatTriggerRule
    if (!regEx && chatPrivateTriggerKeyword) {
      regEx = new RegExp(regexpEncode(chatPrivateTriggerKeyword))
    }
    return regEx
  }

  // remove more times conversation and mention
  cleanMessage(rawText: string, privateChat: boolean = false): string {
    let text = rawText;
    const item = rawText.split("- - - - - - - - - - - - - - -");
    if (item.length > 1) {
      text = item[item.length - 1];
    }

    const { chatTriggerRule, chatPrivateTriggerRule } = this;

    if (privateChat && chatPrivateTriggerRule) {
      text = text.replace(chatPrivateTriggerRule, "")
    } else if (!privateChat) {
      text = text.replace(this.chatGroupTriggerRegEx, "")
      text = chatTriggerRule? text.replace(chatTriggerRule, ""): text
    }
    // remove more text via - - - - - - - - - - - - - - -
    return text
  }
  async getGPTMessage(talkerName: string,text: string): Promise<string> {
    let gptMessage = await chatgpt(talkerName,text);
    if (gptMessage !=="") {
      DBUtils.addAssistantMessage(talkerName,gptMessage);
      return gptMessage;
    }
    return "Sorry, please try again later. 😔";
  }
  // Check if the message returned by chatgpt contains masked words]
  checkChatGPTBlockWords(message: string): boolean {
    if (config.chatgptBlockWords.length == 0) {
      return false;
    }
    return config.chatgptBlockWords.some((word) => message.includes(word));
  }
  // The message is segmented according to its size
  async trySay(
    talker: RoomInterface | ContactInterface,
    mesasge: string
  ): Promise<void> {
    const messages: Array<string> = [];
    if (this.checkChatGPTBlockWords(mesasge)) {
      console.log(`🚫 Blocked ChatGPT: ${mesasge}`);
      return;
    }
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
  // Check whether the ChatGPT processing can be triggered
  triggerGPTMessage(text: string, privateChat: boolean = false): boolean {
    const { chatTriggerRule } = this;
    let triggered = false;
    if (privateChat) {
      const regEx = this.chatPrivateTriggerRule
      triggered = regEx? regEx.test(text): true;
    } else {
      triggered = this.chatGroupTriggerRegEx.test(text);
      // group message support `chatTriggerRule`
      if (triggered && chatTriggerRule) {
        triggered = chatTriggerRule.test(text.replace(this.chatGroupTriggerRegEx, ""))
      }
    }
    if (triggered) {
      console.log(`🎯 Triggered ChatGPT: ${text}`);
    }
    return triggered;
  }
  // Check whether the message contains the blocked words. if so, the message will be ignored. if so, return true
  checkBlockWords(message: string): boolean {
    if (config.blockWords.length == 0) {
      return false;
    }
    return config.blockWords.some((word) => message.includes(word));
  }
  // Filter out the message that does not need to be processed
  isNonsense(
    talker: ContactInterface,
    messageType: MessageType,
    text: string
  ): boolean {
    return (
      talker.self() ||
      // TODO: add doc support
      !(messageType == MessageType.Text || messageType == MessageType.Audio) ||
      talker.name() === "微信团队" ||
      // 语音(视频)消息
      text.includes("收到一条视频/语音聊天消息，请在手机上查看") ||
      // 表情信息
      text.includes('收到了一个表情，请在手机上查看') ||
      // 红包消息
      text.includes("收到红包，请在手机上查看") ||
      // Transfer message
      text.includes("收到转账，请在手机上查看") ||
      // 位置消息
      text.includes("/cgi-bin/mmwebwx-bin/webwxgetpubliclinkimg") ||
      // 聊天屏蔽词
      this.checkBlockWords(text)
    );
  }

  async onPrivateMessage(talker: ContactInterface, text: string) {
    const gptMessage = await this.getGPTMessage(talker.name(),text);
    await this.trySay(talker, gptMessage);
  }

  async onGroupMessage(
    talker: ContactInterface,
    text: string,
    room: RoomInterface
  ) {
    const gptMessage = await this.getGPTMessage(await room.topic(),text);
    const userMessage = text.length > 18 ? `${text.slice(0, 15)}...` : text;
    const result = `@${talker.name()} ${userMessage}\n\n- - - - - - - - - - - - - - -\n\n ${gptMessage}`;
    await this.trySay(room, result);
  }
  async onMessage(message: Message) {
    const talker = message.talker();
    const rawText = message.text();
    const room = message.room();
    const messageType = message.type();
    const privateChat = !room;
    if (privateChat) {
      console.log(`🤵 Contact: ${talker.name()} 💬 Text: ${rawText}`)
    } else {
      const topic = await room.topic()
      console.log(`🚪 Room: ${topic} 🤵 Contact: ${talker.name()} 💬 Text: ${rawText}`)
    }
    if (this.isNonsense(talker, messageType, rawText)) {
      return;
    }
    if (messageType == MessageType.Audio){
      // 保存语音文件
      const fileBox = await message.toFileBox();
      let fileName = "./public/" + fileBox.name;
      await fileBox.toFile(fileName, true).catch((e) => {
        console.log("保存语音失败",e);
        return;
      });
      // Whisper
      whisper("",fileName).then((text) => {
        message.say(text);
      })
      return;
    }
    if (rawText.startsWith("/cmd ")){
      const cmdContent = rawText.slice(5) // 「/cmd 」一共5个字符(注意空格)
      await commander.exec(privateChat ? talker : room, cmdContent);
      return;
    }
    // 使用DallE生成图片
    if (rawText.startsWith("/img")){
      console.log(`🤖 Image: ${rawText}`)
      const imgContent = rawText.slice(4).trim();
      if (!imgContent) return;
      const url = await dalle(privateChat ? talker.name() : await room.topic(), imgContent) as string;
      const fileBox = FileBox.fromUrl(url);
      message.say(fileBox);
      return;
    }
    if (this.triggerGPTMessage(rawText, privateChat)) {
      const text = this.cleanMessage(rawText, privateChat);
      if (privateChat) {
        return await this.onPrivateMessage(talker, text);
      } else{
        if (!this.disableGroupMessage){
          return await this.onGroupMessage(talker, text, room);
        } else {
          return;
        }
      }
    } else {
      return;
    }
  }
}
