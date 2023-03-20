import {config} from "./config.js";

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
    return response.json()
      .then((data) => data.choices[0].message.content);
  } catch (e) {
    console.error(e)
    return "Something went wrong"
  }
}

const sendMessageToDraw = async (message: string) => {
  try {
    console.log(message)
    const response = await fetch(`https://api.openai.com/v1/images/generations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "prompt": message,
        "n": 1,
        "size": "512x512"
      }),
    });
    return response.json()
      .then((data) => data['data'][0]['url']);
  } catch (e) {
    console.error(e)
    return "Something went wrong"
  }
}

export {sendMessage, sendMessageToDraw};
