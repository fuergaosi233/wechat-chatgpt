<h1 align="center">欢迎使用 wechat-chatgpt 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/fuergaosi" target="_blank">
    <img alt="Twitter: fuergaosi" src="https://img.shields.io/twitter/follow/fuergaosi.svg?style=social" />
  </a>
</p>

> 在微信上迅速接入 ChatGPT，让它成为你最好的助手！
[English](README.md) | 中文文档
### 🏠 [主页](https://github.com/fuergaosi233/wechat-chatgpt/blob/main/README_ZH.md)

## 🌟 功能点

- [x] 通过 wechaty，将 ChatGPT 接入微信
- [x] 创建 OpenAI 的账户池
- [x] 支持通过代理登陆 OpenAI
- [x] 加入了持续对话的功能（每一个微信用户都保持自己的对话上下文）
- [x] 加入 Dockerfile
- [x] 发布到 Docker.hub
- [ ] 通过 Railway 进行部署
- [x] 实现 OpenAI 账户池的热加载
- [ ] 当 OpenAI 返回码为 429/503 时自动重试

## 通过 Docker 使用（✅ 推荐）

```sh
cp config.yaml.example config.yaml
# Change Config.yaml
docker run -d --name wechat-chatgpt -v $(pwd)/config.yaml:/app/config.yaml holegots/wechat-chatgpt:latest
# 使用二维码登陆
docker logs -f wechat-chatgpt
```

## 安装

```sh
npm install && poetry install
```

## 手动安装

### 复制配置文件

将配置文件复制一份以配置您的项目

```sh
cp config.yaml.example config.yaml
```

### 获取 OpenAI 的账户并配置到项目中

> 如果你没有 OpenAI 的账号，并且您在无法访问 OpenAI 的国家或地区，你可以查看[here](https://mirror.xyz/boxchen.eth/9O9CSqyKDj4BKUIil7NC1Sa1LJM-3hsPqaeW_QjfFBc).

#### **配置方法 A：使用账号密码**

可以在配置文件中输入你的账号密码，格式如下

```yaml
chatGPTAccountPool:
  - email: <your email>
    password: <your password>
# 如果你希望只有一些关键字可以在私人聊天中触发chatgpt，你可以这样设置:
chatPrivateTiggerKeyword: ""
```

⚠️ 触发关键字必须出现在接收到的消息的第一个位置
⚠️

请确保您的终端网络可以登陆 OpenAI。如果登陆失败，请尝试使用代理或使用 SessionToken 方法配置

**设置代理:**

```sh
export http_proxy=<Your Proxy>
```

#### **B: 使用 Session Token**

如果您无法使用账号密码登陆您的 OpenAI 账户，或者您的终端网络不支持连接到 OpenAI，那么您可以尝试使用 Session Token，请根据如下指示获取：

1. 前往 https://chat.openai.com/chat 并登陆。
2. 按下 F12 打开开发者工具.
3. 点击 Application 选项卡 > Cookies.
   ![image](docs/images/session-token.png)
4. 复制 \_\_Secure-next-auth.session-token 的值，并且以如下方式配置到您的项目中：

```yaml
chatGPTAccountPool:
  - session_token: <your session_token>
```

### 启动项目

```sh
npm run dev
```

如果您是初次登陆，那么需要扫描二维码

## 作者

👤 **holegots**

- Twitter: [@fuergaosi](https://twitter.com/fuergaosi)
- GitHub: [@fuergaosi233](https://github.com/fuergaosi233)

## 🤝 为项目添砖加瓦

欢迎提出 Contributions, issues 与 feature requests!<br />随时查看 [issues page](https://github.com/fuergaosi233/wechat-chatgpt/issues).

## 感谢支持 🙏

如果这个项目对你产生了一点的帮助，请为这个项目点上一颗 ⭐️
