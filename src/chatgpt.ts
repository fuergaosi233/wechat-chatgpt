import {config} from "./config.js";

<<<<<<< HEAD
let apiKey = config.openai_api_key;
let model = config.model;
const sendMessage = async (message: string) => {
  try {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            "role": "user",
            "content": message
          }
        ],
        temperature: 0.6
      }),
    });
    // console.log("response", response.json().then((data) => data.response))
    return response.json()
      .then((data) => data.choices[0].message.content);
=======
let url = config.url
config.url = "http://localhost:4000";
const oneTimeMessage = async (message: string) => {
  try {
    const response = await fetch(`${url}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message
      })
    });
    return response.json().then((data) => data.response);
>>>>>>> origin/chatgpt-api
  } catch (e) {
    console.error(e)
    return "Something went wrong"
  }
}
<<<<<<< HEAD
export {sendMessage};
=======
const sessionMessage = async (message: string, sessionId: string) => {
  try {
    const response = await fetch(`${url}/message/${sessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message
      })
    });
    return response.json().then((data) => data.response);
  } catch (e) {
    console.error(e)
    return "Something went wrong"
  }
}
export {oneTimeMessage, sessionMessage};
>>>>>>> origin/chatgpt-api
