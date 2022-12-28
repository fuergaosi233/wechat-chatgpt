<h1 align="center">Welcome to wechat-chatgpt 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/fuergaosi" target="_blank">
    <img alt="Twitter: fuergaosi" src="https://img.shields.io/twitter/follow/fuergaosi.svg?style=social" />
  </a>
</p>

> Use ChatGPT On Wechat via wechaty  
English | [中文文档](README_ZH.md)

### Update Decomber 27, 2022
Using railway & docker deployment, there may be problems that cannot be solved, we are working on it.

### Update December 20, 2022

Thanks @transitive-bullshit, The ChatGPT API automates the work.  
You should use password & username to login, and config [CAPTCHAs](#CAPTCHAS).  
⚠️ There may be a problem with the Docker image because I don't have an X86 device and Qume doesn't work.

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

## Install

```sh
npm install && poetry install
```

## Config

### Copy config

You need copy config file for setting up your project.

```sh
cp config.yaml.example config.yaml
```

### Get and config Openai account

> If you don't have this OpenAI account and you live in China, you can get it [here](https://mirror.xyz/boxchen.eth/9O9CSqyKDj4BKUIil7NC1Sa1LJM-3hsPqaeW_QjfFBc).

#### Use account and password

You need get OpenAI account and password.
Your config.yaml should be like this:

```yaml
chatGPTAccountPool:
  - email: <your email>
    password: <your password>
# if you hope only some keywords can trigger chatgpt on private chat, you can set it like this:
chatPrivateTiggerKeyword: ""
```

⚠️ Trigger keywords must appear in the first position of the received message.
⚠️ Pls make sure your network can log in to OpenAI, and if you fail to login in try setting up a proxy or using SessionToken.

**Setup proxy:**

You can configure in `config.yaml`:

```yaml
openAIProxy: <Your Proxy>
```

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

If you are logging in for the first time, then you need to scan the qrcode.

👤 **holegots**

- Twitter: [@fuergaosi](https://twitter.com/fuergaosi)
- GitHub: [@fuergaosi233](https://github.com/fuergaosi233)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/fuergaosi233/wechat-chatgpt/issues).

## Show your support

Give a ⭐️ if this project helped you!
