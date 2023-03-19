import {Configuration, OpenAIApi} from "openai";
import DBUtils from "./data.js";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Get completion from OpenAI
 * @param username
 * @param message
 */
async function getCompletion(username:string,message: string): Promise<string> {
  // 先将用户输入的消息添加到数据库中
  DBUtils.addUserMessage(username, message);
  const messages = DBUtils.getChatMessage(username);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.6
  }).then((res) => res.data);
  if (response.choices[0].message) {
    return response.choices[0].message.content.replace(/^\n+|\n+$/g, "");
  } else {
    return "Something went wrong"
  }
}

export {getCompletion};