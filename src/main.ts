import { WechatyBuilder } from "wechaty";
import QRCode from "qrcode";
import { ChatGPTBot } from "./bot.js";
import {config} from "./config.js";
import {voiceToText} from "./whisper.js";
import {getAllData} from "./data.js";

const chatGPTBot = new ChatGPTBot();

const bot =  WechatyBuilder.build({
  name: "wechat-assistant", // generate xxxx.memory-card.json and save login data for the next login
  puppet: "wechaty-puppet-wechat",
  puppetOptions: {
    uos:true
  }
});
async function main() {
  // 启动一个计时器, 每20秒打印一个数据库
  setInterval(() => {
    const data = getAllData()
    if (data){
      data.map((item) => {
        console.log("item: ",item)
      })
    }
  }, 20000)
  const initializedAt = Date.now()
  bot
    .on("scan", async (qrcode, status) => {
      const url = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`;
      console.log(`Scan QR Code to login: ${status}\n${url}`);
      console.log(
        await QRCode.toString(qrcode, { type: "terminal", small: true })
      );
    })
    .on("login", async (user) => {
      chatGPTBot.setBotName(user.name());
      console.log(`User ${user} logged in`);
      console.log(`私聊触发关键词: ${config.chatPrivateTriggerKeyword}`);
      console.log(`已设置 ${config.blockWords.length} 个聊天关键词屏蔽. ${config.blockWords}`);
      console.log(`已设置 ${config.chatgptBlockWords.length} 个ChatGPT回复关键词屏蔽. ${config.chatgptBlockWords}`);
    })
    .on("message", async (message) => {
      if (message.date().getTime() < initializedAt) {
        return;
      }
      if (message.text().startsWith("/ping")) {
        await message.say("pong");
        return;
      }
      if (message.type() === bot.Message.Type.Audio) {
        console.log("收到语音消息");
        // const fileBox = FileBox.fromFile("/Users/RealTong/Pictures/Snipaste_2022-07-29_17-38-50.png")
        // message.say(fileBox)
        // const urlLink = new UrlLink({
        //   description: 'Wechaty is a Bot SDK for Wechat Individual Account which can help you create a bot in 6 lines of javascript, with cross-platform support including Linux, Windows, Darwin(OSX/Mac) and Docker.',
        //   thumbnailUrl: 'https://camo.githubusercontent.com/f310a2097d4aa79d6db2962fa42bb3bb2f6d43df/68747470733a2f2f6368617469652e696f2f776563686174792f696d616765732f776563686174792d6c6f676f2d656e2e706e67',
        //   title: 'Wechaty',
        //   url: 'https://github.com/wechaty/wechaty',
        // });
        //
        // await message.say();
        const media = await message.toFileBox();
        const name = media.name;
        console.log(`收到语音消息: ${name}`);
        media.toFile("/Users/RealTong/Desktop/Medias/"+name, true);

        message.toFileBox().then((fileBox) => {
          // 保存文件
          fileBox.toFile("/Users/RealTong/Desktop/Medias/"+fileBox.name, true);
          // Whisper
          voiceToText("/Users/RealTong/Desktop/Medias/"+fileBox.name).then((text) => {
              console.log("语音转文字: ",text);
          })
        })
        return;
      }
      if(message.type() === bot.Message.Type.Post){
        console.log("收到群消息");
        return;
      }


      try {
        await chatGPTBot.onMessage(message);
      } catch (e) {
        console.error(e);
      }
    })
    .on("error",()=>{
      console.log("ERROR !!!");
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
