import { WechatyBuilder } from "wechaty";
import QRCode from "qrcode";
import { ChatGPTBot } from "./chatgpt.js";
const chatGPTBot = new ChatGPTBot();

const bot = WechatyBuilder.build({
  name: "wechat-assistant", // generate xxxx.memory-card.json and save login data for the next login
});
// get a Wechaty instance

async function main() {
  bot
    .on("scan", async (qrcode, status) => {
      const url = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`;
      console.log(`Scan QR Code to login: ${status}\n${url}`);
      console.log(
        await QRCode.toString(qrcode, { type: "terminal", small: true })
      );
    })
    .on("login", async (user) => {
      console.log(`User ${user} logged in`);
      chatGPTBot.setBotName(user.name());
      await chatGPTBot.startGPTBot();
    })
    .on("message", async (message) => {
      if (message.text().startsWith("/ping ")) {
        await message.say("pong");
        return;
      }
      try {
        console.log(`Message: ${message}`);
        await chatGPTBot.onMessage(message);
      } catch (e) {
        console.error(e);
      }
    });
  try {
    await bot.start();
  } catch (e) {
    console.error(
      `⚠️ Bot start failed, can you log in through wechat on the web?: ${e}`
    );
  }
}
main();
