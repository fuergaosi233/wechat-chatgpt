import {config} from "./config.js";

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
  } catch (e) {
    console.error(e)
    return "Something went wrong"
  }
}
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