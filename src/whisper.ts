import {config} from "./config.js";
// const fs = require('fs');
import fs from 'fs';

let api = config.api;
let apiKey = config.openai_api_key;
const voiceToText = async (path:string) => {
  const formData = new FormData();
  formData.append("model", "whisper-1");
  // 根据文件路径读取文件
  const fileContent = fs.readFileSync(path)
  // @ts-ignore
  formData.append("file",fileContent);
  try {
    const response = await fetch(`${api}/v1/audio/transcriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData
    }).then((res) => res.json());
    if (response.error?.message) {
      console.log("OpenAI API ERROR: ",response.error.message)
      // throw new Error(`OpenAI API ${response.error.message}`);
    }
    return response.text;
  } catch (e) {
    console.error(e)
    return "Something went wrong"
  }
}

export {voiceToText};