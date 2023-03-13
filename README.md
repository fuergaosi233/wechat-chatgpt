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
> English | [中文文档](README_ZH.md)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/dMLG70?referralCode=bIYugQ)

## 🌟 Features

- Interact with WeChat and ChatGPT:
   - Use ChatGPT on WeChat with [wechaty](https://github.com/wechaty/wechaty) and [Official API](https://openai.com/blog/introducing-chatgpt-and-whisper-apis)
   - Add conversation support
   - Support command setting

- Deployment and configuration options:
   - Add Dockerfile, deployable with [docker](#use-with-docker)
   - Support deployment using [docker compose](#use-with-docker-compose)
   - Support [Railway](#use-with-railway) and [Fly.io](#use-with-flyio) deployment

- Other features:
   - Support [Dall·E](https://labs.openai.com/)
   - Support [whisper](https://openai.com/blog/introducing-chatgpt-and-whisper-apis)
   - Support setting prompt
   - Support proxy (in development)

## 🚀 Usage
- [Use with Railway](#use-with-railway)(PaaS, Free, Stable, ✅Recommended)
- [Use with Fly.io](#use-with-flyio)(Paas, Free, ✅Recommended)
- [Use with docker](#use-with-docker)(Self-hosted, Stable, ✅Recommended)
- [Use with docker compose](#use-with-docker-compose)(Self-hosted, Stable, ✅Recommended)
- [Use with nodejs](#use-with-nodejs)(Self-hosted)

## Use with Railway
> Railway offers $5 or 500 hours of runtime per month
1. Click the [Railway](https://railway.app/template/dMLG70?referralCode=bIYugQ) button to go to the Railway deployment page
2. Click the `Deploy Now` button to enter the Railway deployment page
3. Fill in the repository name and `OPENAI_API_KEY` (need to link GitHub account)
4. Click the `Deploy` button
5. Click the `View Logs` button and wait for the deployment to complete

## Use with Fly.io
> Please allocate 512MB memory for the application to meet the application requirements

> fly.io offers free bills up to $5(Free Allowances 3 256MB are not included in the bill)
1. Install [flyctl](https://fly.io/docs/getting-started/installing-flyctl/)
   ```shell
    # macOS
    brew install flyctl
    # Windows
    scoop install flyctl
    # Linux
    curl https://fly.io/install.sh | sh
   ```
2. Clone the project and enter the project directory
   ```shell
   git clone https://github.com/fuergaosi233/wechat-chatgpt.git && cd wechat-chatgpt
   ```
3. Create a new app
   ```shell
   ➜ flyctl launch 
    ? Would you like to copy its configuration to the new app? No
    ? App Name (leave blank to use an auto-generated name): <YOUR APP NAME>
    ? Select region: <YOUR CHOOSE REGION>
    ? Would you like to setup a Postgresql database now? No
    ? Would you like to deploy now? No
   ```
4. Configure the environment variables
   ```shell
   flyctl secrets set OPENAI_API_KEY="<YOUR OPENAI API KEY>" MODEL="<CHATGPT-MODEL>"
   ```
5. Deploy the app
   ```shell
   flyctl deploy
   ```

## Use with docker

```sh
# pull image
docker pull holegots/wechat-chatgpt
# run container
docker run -d --name wechat-chatgpt \
    -e OPENAI_API_KEY=<YOUR OPENAI API KEY> \
    -e MODEL="gpt-3.5-turbo" \
    -e CHAT_PRIVATE_TRIGGER_KEYWORD="" \
    -v $(pwd)/data:/app/data/wechat-assistant.memory-card.json \
    holegots/wechat-chatgpt:latest
# View the QR code to log in to wechat
docker logs -f wechat-chatgpt
```
> How to get OPENAI API KEY? [Click here](https://platform.openai.com/account/api-keys)

## Use with docker compose

```sh
# Copy the configuration file according to the template
cp .env.example .env
# Edit the configuration file
vim .env
# Start the container
docker-compose up -d
# View the QR code to log in to wechat
docker logs -f wechat-chatgpt
```

## Use with nodejs

> You need NodeJS 18.0.0 version and above

```sh
# Clone the project
git clone https://github.com/fuergaosi233/wechat-chatgpt.git && cd wechat-chatgpt
# Install dependencies
npm install
# Copy the configuration file according to the template
cp .env.example .env
# Edit the configuration file
vim .env
# Start project
npm run dev
```

> Please make sure your WeChat account can log in [WeChat on web](https://wx.qq.com/)

## 📝 Environment Variables

| name                         | description                                                                                                                                                                          |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API                          | API endpoint of ChatGPT                                                                                                                                                              |
| OPENAI_API_KEY               | [create new secret key](https://platform.openai.com/account/api-keys)                                                                                                                |
| MODEL                        | ID of the model to use. Currently, only gpt-3.5-turbo and gpt-3.5-turbo-0301 are supported.                                                                                          |
| TEMPERATURE                  | What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. |
| CHAT_TRIGGER_RULE            | Private chat triggering rules.                                                                                                                                                       |
| DISABLE_GROUP_MESSAGE        | Prohibited to use ChatGPT in group chat.                                                                                                                                             |
| CHAT_PRIVATE_TRIGGER_KEYWORD | Keyword to trigger ChatGPT reply in WeChat private chat                                                                                                                              |
| BLOCK_WORDS                  | Chat blocker words, (works for both private and group chats, Use, Split)                                                                                                             |
| CHATGPT_BLOCK_WORDS          | The blocked words returned by ChatGPT(works for both private and group chats, Use, Split)                                                                                            |

## 📝 Using Custom ChatGPT API

> https://github.com/fuergaosi233/openai-proxy

```shell
# Clone the project
git clone https://github.com/fuergaosi233/openai-proxy
# Install dependencies
npm install && npm install -g wrangler && npm run build
# Deploy to CloudFlare Workers
npm run deploy
# Custom domain (optional)
Add `Route` to `wrangler.toml`
routes = [
    { pattern = "Your Custom Domain", custom_domain = true },
]
```

## ⌨️ Commands
> Enter in the WeChat chat box
```shell
/cmd help # Show help
/cmd prompt <PROMPT> # Set prompt
/cmd clear # Clear all sessions since last boot
```

## ✨ Contributor

<a href="https://github.com/fuergaosi233/wechat-chatgpt/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fuergaosi233/wechat-chatgpt" />
</a>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to
check [issues page](https://github.com/fuergaosi233/wechat-chatgpt/issues).

## Show your support

Give a ⭐️ if this project helped you!
