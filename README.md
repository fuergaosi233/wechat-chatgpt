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

## 🌟 Feature

- [x] Use ChatGPT on WeChat with [wechaty](https://github.com/wechaty/wechaty)
  and [chatapi-single](https://github.com/bytemate/chatapi-single)
- [x] Add conversation Support
- [x] Add Dockerfile, you can use it with [docker](#use-with-docker---recommended-)
- [x] Publish to Docker.hub
- [x] Deploy using [docker compose](#use-with-docker-compose---recommended-)
- [ ] Add Railway deploy

## Use with docker(✅ Recommended)

```sh
# pull image
docker pull fuergaosi/wechat-chatgpt:latest
# run container
docker run -d --name wechat-chatgpt \
    -e SERVER_URL=http://localhost:4000 \
    -v $(pwd)/data:/app/data/wechat-assistant.memory-card.json \
    fuergaosi/wechat-chatgpt:latest
# View the QR code to log in to wechat
docker logs -f wechat-chatgpt
```

## Use with docker compose(✅ Recommended)

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
npm npm dev
```

> Please make sure your WeChat account can log in [WeChat on web](https://wx.qq.com/)

## ✨ Contributor

<a href="https://github.com/fuergaosi233/wechat-chatgpt/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fuergaosi233/wechat-chatgpt" />
</a>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to
check [issues page](https://github.com/fuergaosi233/wechat-chatgpt/issues).

## Show your support

Give a ⭐️ if this project helped you!
