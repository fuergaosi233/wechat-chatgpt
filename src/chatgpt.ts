import {config} from "./config.js";
import fetch from 'node-fetch'
import createHttpsProxyAgent from "https-proxy-agent"

let apiKey = config.openai_api_key;
let model = config.model;
let requestProxy = config.requestProxy;

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
      agent: createHttpsProxyAgent(requestProxy)
    });
    return JSON.parse(await response.text()).choices[0].message.content;
  } catch (e) {
    console.error(e)
    return "Something went wrong"
  }
}

export {sendMessage};