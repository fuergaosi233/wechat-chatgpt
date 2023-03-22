<h1 align="center">欢迎使用 wechat-chatgpt 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/fuergaosi" target="_blank">
    <img alt="Twitter: fuergaosi" src="https://img.shields.io/twitter/follow/fuergaosi.svg?style=social" />
  </a>
  <a href="https://discord.gg/8fXNrxwUJH" target="blank">
    <img src="https://img.shields.io/discord/1058994816446369832?label=Join%20Community&logo=discord&style=flat-square" alt="join discord community of github profile readme generator"/>
  </a>
</p>

> 在微信上迅速接入 ChatGPT，让它成为你最好的助手！  
> [English](README.md) | 中文文档

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/dMLG70?referralCode=bIYugQ)

## 🌟 功能点

- 使用 WeChat 和 ChatGPT 进行互动：
   - 基于 [wechaty](https://github.com/wechaty/wechaty) 和 [Official API](https://openai.com/blog/introducing-chatgpt-and-whisper-apis) 在微信中使用 ChatGPT
   - 支持多轮对话
   - 支持[命令](#-命令)设置

- 部署和配置选项：
   - 提供 Dockerfile，可以通过 [docker](#通过docker使用) 进行部署
   - 支持使用 [docker compose](#通过docker-compose使用) 进行部署
   - 支持在 [Railway](#使用railway进行部署) 和 [Fly.io](#通过flyio进行部署) 上部署

- 其他功能：
   - 支持 [Dall·E](https://labs.openai.com/)
   - 支持 [whisper](https://openai.com/blog/introducing-chatgpt-and-whisper-apis)
   - 支持设置 prompt
   - 支持代理（开发中）

## 🚀 使用

- [在 Railway 部署](#使用railway进行部署)(PaaS, 免费, 稳定, ✅推荐)
- [在 Fly.io 部署](#通过flyio进行部署)(PaaS, 免费, ✅推荐)
- [使用 Docker 部署](#通过docker使用)(自托管, 稳定, ✅推荐)
- [使用 Docker Compose 部署](#通过docker-compose使用)(自托管, 稳定, ✅推荐)
- [使用 NodeJS 部署](#使用nodejs运行)

## 使用Railway进行部署

> Railway 是一个免费的 PaaS 平台，5刀以内的账单免费或者每个月500小时的运行时间

1. 点击 [Railway](https://railway.app/template/dMLG70?referralCode=bIYugQ) 按钮，进入 Railway 部署页面
2. 点击 `Deploy Now` 按钮，进入 Railway 部署页面
3. 填写 仓库名称和 `OPENAI_API_KEY`(需要连接 GitHub 账号)
4. 点击 `Deploy` 按钮
5. 点击 `View Logs` 按钮，等待部署完成

## 通过Fly.io进行部署

> 请为应用程序分配 512 MB 内存，否则可能会出现内存溢出

> Fly.io 5刀以内的账单免费(免费计划的3个256MB的应用不在账单内)也就是可以同时可以部署 `1*512MB + 3*256MB`

1. 安装 [flyctl](https://fly.io/docs/getting-started/installing-flyctl/)
   ```shell
    # macOS
    brew install flyctl
    # Windows
    scoop install flyctl
    # Linux
    curl https://fly.io/install.sh | sh
   ```
2. 克隆项目并进入项目目录
   ```shell
   git clone https://github.com/fuergaosi233/wechat-chatgpt.git && cd wechat-chatgpt
   ```
3. 创建应用
   ```shell
   ➜ flyctl launch 
    ? Would you like to copy its configuration to the new app? No
    ? App Name (leave blank to use an auto-generated name): <YOUR APP NAME>
    ? Select region: <YOUR CHOOSE REGION>
    ? Would you like to setup a Postgresql database now? No
    ? Would you like to deploy now? No
   ```
4. 配置环境变量
   ```shell
   flyctl secrets set OPENAI_API_KEY="<YOUR OPENAI API KEY>" MODEL="<CHATGPT-MODEL>"
   ```
5. 部署应用
   ```shell
   flyctl deploy
   ```

## 通过Docker使用

```sh
# 拉取镜像
docker pull holegots/wechat-chatgpt:latest
# 运行容器
docker run -it --name wechat-chatgpt \
    -e OPENAI_API_KEY=<YOUR OPENAI API KEY> \
    -e MODEL="gpt-3.5-turbo" \
    -e CHAT_PRIVATE_TRIGGER_KEYWORD="" \
    -v $(pwd)/data:/app/data/wechat-assistant.memory-card.json \
    holegots/wechat-chatgpt:latest
# 使用二维码登陆
docker logs -f wechat-chatgpt
```

> 如何获取 OPENAI API KEY？请参考 [OpenAI API](https://platform.openai.com/account/api-keys)。

## 通过docker compose使用

```sh
# 根据模板拷贝配置文件
cp .env.example .env
# 使用你喜欢的文本编辑器修改配置文件
vim .env
# 在Linux或WindowsPowerShell上运行如下命令
docker compose up -d
# 使用二维码登陆
docker logs -f wechat-chatgpt
```

## 使用NodeJS运行

> 请确认安装的NodeJS版本为18.0.0以上

```sh
# 克隆项目
git clone https://github.com/fuergaosi233/wechat-chatgpt.git && cd wechat-chatgpt
# 安装依赖
npm install
# 编辑配置
cp .env.example .env
vim .env # 使用你喜欢的文本编辑器修改配置文件
# 启动项目
npm run dev
# 如果您是初次登陆，那么需要扫描二维码
```

> 请确保您的账号可以登陆 [网页版微信](https://wx.qq.com/)。

## 📝 Environment Variables

| name                         | default                | example                                        | description                                                 |
|------------------------------|------------------------|------------------------------------------------|-------------------------------------------------------------|
| ~~API~~                      | https://api.openai.com |                                                | ~~ChatGPT API 地址~~                                          |
| OPENAI_API_KEY               | 123456789              | sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX | [创建你的 API 密钥](https://platform.openai.com/account/api-keys) |
| MODEL                        | gpt-3.5-turbo          |                                                | 要使用的模型ID, 目前仅支持`gpt-3.5-turbo` 和 `gpt-3.5-turbo-0301`       |
| TEMPERATURE                  | 0.6                    |                                                | 在0和2之间。较高的数值如0.8会使 ChatGPT 输出更加随机，而较低的数值如0.2会使其更加稳定。        |
| CHAT_TRIGGER_RULE            |                        |                                                | 私聊触发规则                                                      |
| DISABLE_GROUP_MESSAGE        | true                   |                                                | 禁用在群聊里使用ChatGPT                                             |
| CHAT_PRIVATE_TRIGGER_KEYWORD |                        |                                                | 在私聊中触发ChatGPT的关键词, 默认是无需关键词即可触发                             |
| BLOCK_WORDS                  | "VPN"                  | "WORD1,WORD2,WORD3"                            | 聊天屏蔽关键词(同时在群组和私聊中生效, 避免 bot 用户恶意提问导致封号                      |
| CHATGPT_BLOCK_WORDS          | "VPN"                  | "WORD1,WORD2,WORD3"                            | ChatGPT回复屏蔽词, 如果ChatGPT的回复中包含了屏蔽词, 则不回复                     |

## 📝 使用自定义ChatGPT API
> https://github.com/fuergaosi233/openai-proxy
```shell
# 克隆项目
git clone https://github.com/fuergaosi233/openai-proxy
# 安装依赖
npm install && npm install -g wrangler && npm run build
# 部署到 CloudFlare Workers
npm run deploy
# 自定义域名(可选)
添加 `Route`` 到 `wrangler.toml`
routes = [
	{ pattern = "Your Custom Domain", custom_domain = true },
]
```

## ⌨️ 命令
> 在微信聊天框中输入
```shell
/cmd help # 显示帮助信息
/cmd prompt <PROMPT> # 设置ChatGPT Prompt
/cmd clear # 清除WeChat-ChatGPT保存的会话记录
```

## ✨ Contributor

<a href="https://github.com/fuergaosi233/wechat-chatgpt/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fuergaosi233/wechat-chatgpt" />
</a>

## 🤝 为项目添砖加瓦

欢迎提出 Contributions, issues 与 feature requests!<br />
随时查看 [issues page](https://github.com/fuergaosi233/wechat-chatgpt/issues).

## 感谢支持 🙏

如果这个项目对你产生了一点的帮助，请为这个项目点上一颗 ⭐️