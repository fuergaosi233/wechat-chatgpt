import {Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum} from "openai";
import {addSessionByUsername, getUserByUsername} from "./data.js";
import {ChatCompletionRequestMessage} from "openai/api";


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
  let userData = getUserByUsername(username)
  const messages:ChatCompletionRequestMessage[] = [];
  if (userData) {
    // 添加用户输入的消息
    addSessionByUsername(username, {userMsg: message})
    // fill prompt
    if(userData.prompt!==""){
      messages.push({
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: userData.prompt
      })
    }
    // fill messages
    userData.session.map((item) => {
      if (item.userMsg!=="") {
        messages.push({
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: item.userMsg as string
        })
      }
      if (item.assistantMsg!=="") {
        messages.push({
          role: ChatCompletionRequestMessageRoleEnum.Assistant,
          content: item.assistantMsg as string
        })
      }
    })
  }else{
    return "请先执行/cmd prompt命令. \n EXAMPLE: /cmd prompt 你的prompt"
  }
  console.log("ChatGPT MESSages: ", messages)
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