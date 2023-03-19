import {Configuration, CreateImageRequestResponseFormatEnum, CreateImageRequestSizeEnum, OpenAIApi} from "openai";
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
async function chatgpt(username:string,message: string): Promise<string> {
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

// const response = await openai.createImage({
//   prompt: "a white siamese cat",
//   n: 1,
//   size: "1024x1024",
// });
// image_url = response.data.data[0].url;
function dalle(username:string,prompt: string) {
  const response = openai.createImage({
    prompt: prompt,
    n:1,
    size: CreateImageRequestSizeEnum._256x256,
    response_format: CreateImageRequestResponseFormatEnum.Url,
    user: username
  }).then((res) => res.data);
  return response.then((res) => res.data[0].url);
}

export {chatgpt,dalle};