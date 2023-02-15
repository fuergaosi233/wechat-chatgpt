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

- [x] 通过 [wechaty](https://github.com/wechaty/wechaty) 和 [chatapi-single](https://github.com/bytemate/chatapi-single)，将 ChatGPT 接入微信
- [x] 加入了持续对话的功能
- [x] 加入 Dockerfile, 通过 [Docker](#通过docker使用-推荐) 进行部署
- [x] 发布到 Docker.hub
- [x] 使用[docker compose](#通过docker-compose使用-推荐)进行部署
- [ ] 通过 Railway 进行部署
- 

## 通过Docker使用（✅ 推荐）

```sh
# 拉取镜像
docker pull fuergaosi/wechat-chatgpt:latest
# 运行容器
docker run -it --name wechat-chatgpt \
    -e SERVER_URL=http://localhost:4000 \
    -v $(pwd)/data:/app/data/wechat-assistant.memory-card.json \
    fuergaosi/wechat-chatgpt:latest
# 使用二维码登陆
docker logs -f wechat-chatgpt
```

## 通过docker compose使用（✅ 推荐）

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


## ✨ Contributor

<a href="https://github.com/fuergaosi233/wechat-chatgpt/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fuergaosi233/wechat-chatgpt" />
</a>

## 🤝 为项目添砖加瓦

欢迎提出 Contributions, issues 与 feature requests!<br />随时查看 [issues page](https://github.com/fuergaosi233/wechat-chatgpt/issues).

## 感谢支持 🙏

如果这个项目对你产生了一点的帮助，请为这个项目点上一颗 ⭐️
