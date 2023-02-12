<h1 align="center">Welcome to wechat-chatgpt 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/fuergaosi" target="_blank">
    <img alt="Twitter: fuergaosi" src="https://img.shields.io/twitter/follow/fuergaosi.svg?style=social" />
  </a>
  </a>
  <a href="https://discord.gg/8fXNrxwUJH" target="blank">
    <img src="https://img.shields.io/discord/1058994816446369832?label=Join%20Community&logo=discord&style=flat-square" alt="join discord community of github profile readme generator"/>
  </a>
</p>

> Use ChatGPT On Wechat via wechaty  
English | [中文文档](README_ZH.md)

## 🌟 Feature

- [x] Use ChatGPT On Wechat via wechaty
- [x] Support OpenAI Accounts Pool
- [x] Support use proxy to login
- [x] Add conversation Support
- [x] Add Dockerfile
- [x] Publish to Docker.hub
- [x] Add Railway deploy
- [x] Auto Reload OpenAI Accounts Pool
- [X] Add sendmessage retry for 429/503

## Use with docker

```sh
# Copy config file
cp .env.example .env
# Use your favorite editor change .env
vim .env
# run docker compose
docker compose up -d
# login with qrcode
docker logs -f wechat-chatgpt
```

## Install

```sh
npm install
```
> NodeJS Version >= 18.0.0

## Config

### Copy config

You need copy config file for setting up your project.

```sh
cp .env.example .env
```

### Get and config Openai account

> If you don't have this OpenAI account and you live in China, you can get it [here](https://mirror.xyz/boxchen.eth/9O9CSqyKDj4BKUIil7NC1Sa1LJM-3hsPqaeW_QjfFBc).

#### Use account and password

The configuration file for chatapi-single can be found here: [chatapi-single](https://github.com/bytemate/chatapi-single#config)

You need get OpenAI account and password.
Your .env should be like this:

```text
# Require
EMAIL=<your email>
# Require
PASSWORD=<your password>
```

⚠️ Trigger keywords must appear in the first position of the received message.
⚠️ Pls make sure your network can log in to OpenAI, and if you fail to login in try setting up a proxy.

### CAPTCHAS

> The browser portions of this package use Puppeteer to automate as much as possible, including solving all CAPTCHAs. 🔥

> Basic Cloudflare CAPTCHAs are handled by default, but if you want to automate the email + password Recaptchas, you'll need to sign up for one of these paid providers:

> - [nopecha](https://nopecha.com/) - Uses AI to solve CAPTCHAS
>   - Faster and cheaper
>   - Set the `NOPECHA_KEY` env var to your nopecha API key
>   - [Demo video](https://user-images.githubusercontent.com/552829/208235991-de4890f2-e7ba-4b42-bf55-4fcd792d4b19.mp4) of nopecha solving the login Recaptcha (41 seconds)
> - [2captcha](https://2captcha.com) - Uses real people to solve CAPTCHAS
>   - More well-known solution that's been around longer
>   - Set the `CAPTCHA_TOKEN` env var to your 2captcha API token

So you should config `NOPECHA_KEY` or `CAPTCHA_TOKEN` in your Environment Variables.

## Start Project

```sh
npm run dev
```

## ✨ Contributor

<a href="https://github.com/fuergaosi233/wechat-chatgpt/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fuergaosi233/wechat-chatgpt" />
</a>


## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/fuergaosi233/wechat-chatgpt/issues).

## Show your support

Give a ⭐️ if this project helped you!
