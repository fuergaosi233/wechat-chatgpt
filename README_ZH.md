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

## 🌟 功能点

- [x] 通过 wechaty，将 ChatGPT 接入微信
- [x] 创建 OpenAI 的账户池
- [x] 支持通过代理登陆 OpenAI
- [x] 加入了持续对话的功能
- [x] 加入 Dockerfile
- [x] 发布到 Docker.hub
- [x] 通过 Railway 进行部署
- [x] 实现 OpenAI 账户池的热加载
- [X] 当 OpenAI 返回码为 429/503 时自动重试

## 通过Docker使用（✅ 推荐）

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

## 安装

```sh
npm install
```
> 请确认安装的NodeJS版本为18.0.0以上

## 配置

### 复制配置文件

将配置文件复制一份以配置您的项目

```sh
cp .env.example .env
```

### 获取 OpenAI 的账户并配置到项目中

> 如果你没有 OpenAI 的账号，并且您在无法访问 OpenAI 的国家或地区，你可以查看[here](https://mirror.xyz/boxchen.eth/9O9CSqyKDj4BKUIil7NC1Sa1LJM-3hsPqaeW_QjfFBc).

#### 配置方法 A：使用账号密码

关于chatapi-single的配置文件可以查看这里: [chatapi-single](https://github.com/bytemate/chatapi-single#config)

可以在配置文件中输入你的账号密码，格式如下

```text
# Require
EMAIL=<your email>
# Require
PASSWORD=<your password>
```

⚠️ 触发关键字必须出现在接收到的消息的第一个位置⚠️

请确保您的终端网络可以登陆 OpenAI。如果登陆失败，请尝试使用代理.

### CAPTCHAS
> 该版本使用Puppeteer来尽可能的实现全自动化, 包括验证码 🔥
> Cloudflare CAPTCHAs是默认处理的, 但如果你想自动处理 邮箱+密码 的Recaptchas, 则需要使用付费的打码平台
> - [nopecha](https://nopecha.com/) - Uses AI to solve CAPTCHAS
    >   - Faster and cheaper
    >   - Set the `NOPECHA_KEY` env var to your nopecha API key
>   - [Demo video](https://user-images.githubusercontent.com/552829/208235991-de4890f2-e7ba-4b42-bf55-4fcd792d4b19.mp4) of nopecha solving the login Recaptcha (41 seconds)
> - [2captcha](https://2captcha.com) - Uses real people to solve CAPTCHAS
    >   - More well-known solution that's been around longer
    >   - Set the `CAPTCHA_TOKEN` env var to your 2captcha API token

如果你需要实现全自动化, 则需要配置`NOPECHA_KEY`或`CAPTCHA_TOKEN`。

### 启动项目

```sh
npm run dev
```

如果您是初次登陆，那么需要扫描二维码

## ✨ Contributor

<a href="https://github.com/fuergaosi233/wechat-chatgpt/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fuergaosi233/wechat-chatgpt" />
</a>

## 🤝 为项目添砖加瓦

欢迎提出 Contributions, issues 与 feature requests!<br />随时查看 [issues page](https://github.com/fuergaosi233/wechat-chatgpt/issues).

## 感谢支持 🙏

如果这个项目对你产生了一点的帮助，请为这个项目点上一颗 ⭐️
