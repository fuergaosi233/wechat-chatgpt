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

### 🏠 [Homepage](https://github.com/fuergaosi233/wechat-chatgpt)

## 🌟 Feature
- [x] Use ChatGPT On Wechat via wechaty
- [x] Support OpenAI Accounts Pool
- [x] Support use proxy to login
- [X] Simulated at message receive
- [X] Add conversation Support (Everyone will have their own session)
- [ ] Add Dockerfile
- [ ] Add Railray deploy
- [ ] Auto Reload OpenAI Accounts Pool

## Install

```sh
npm install && poetry install
```

## Usage
### Copy config
You need copy config file for setting up your project.
```sh
cp config.yaml.example config.yaml
```
### Get and config Openai account
> If you don't have this OpenAI account and you live in China, you can get it [here](https://mirror.xyz/boxchen.eth/9O9CSqyKDj4BKUIil7NC1Sa1LJM-3hsPqaeW_QjfFBc).
#### **A：Use account and password**
You need get OpenAI account and password.
Your config.yaml should be like this:
```yaml
chatGPTAccountPool:
  - email: <your email>
    password: <your password>
```
⚠️ Pls make sure your network can log in to OpenAI, and if you fail to login in try setting up a proxy or using SessionToken.  
**Setup proxy:**
```sh
export http_proxy=<Your Proxy>
```
#### **B: Use Session Token**
If you cant use email and password to login your openai account or your network can't login, you can use session token. You need to follow these steps:  
1. Go to https://chat.openai.com/chat and log in or sign up.
2. Open dev tools.
3. Open Application > Cookies.
![image](docs/images/session-token.png)
4. Copy the value for __Secure-next-auth.session-token and save it to your config
Your config.yaml should be like this:
```yaml
chatGPTAccountPool:
  - session_token: <your session_token>
```

### Start Project
```sh
npm run dev
```
If you are logging in for the first time, then you need to scan the qrcode.
## Author

👤 **holegots**

* Twitter: [@fuergaosi](https://twitter.com/fuergaosi)
* Github: [@fuergaosi233](https://github.com/fuergaosi233)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/fuergaosi233/wechat-chatgpt/issues). 

## Show your support

Give a ⭐️ if this project helped you!
