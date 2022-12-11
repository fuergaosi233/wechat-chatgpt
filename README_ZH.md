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
> [English](README.md) | 中文文档

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/BHJD6L?referralCode=FaJtD_)  

如果你没有自己的服务器或者想体验快速部署，可使用 Railway 进行部署，参见 [Railway 部署](#railway-部署)。

## 🌟 功能点

- [x] 通过 wechaty，将 ChatGPT 接入微信
- [x] 创建 OpenAI 的账户池
- [x] 支持通过代理登陆 OpenAI
- [x] 加入了持续对话的功能（每一个微信用户都保持自己的对话上下文）
- [x] 加入 Dockerfile
- [x] 发布到 Docker.hub
- [x] 通过 Railway 进行部署
- [x] 实现 OpenAI 账户池的热加载
- [ ] 当 OpenAI 返回码为 429/503 时自动重试

## 在Linux上通过Docker使用（✅ 推荐）

```sh
cp config.yaml.example config.yaml
# 在当前目录创建并修改config.yaml
# 在Linux或WindowsPowerShell上运行如下命令
docker run -d --name wechat-chatgpt -v $(pwd)/config.yaml:/app/config.yaml holegots/wechat-chatgpt:latest
# 使用二维码登陆
docker logs -f wechat-chatgpt
```

## 在Windows上通过Docker使用

```sh
# 在当前目录创建并修改config.yaml
# 在WindowsPowerShell中运行如下命令
docker run -d --name wechat-chatgpt -v $(pwd)/config.yaml:/app/config.yaml holegots/wechat-chatgpt:latest
# 在Windows command line (cmd)中, 您需要像这样修改上述代码的挂载目录:
docker run -d --name wechat-chatgpt -v %cd%/config.yaml:/app/config.yaml holegots/wechat-chatgpt:latest
# 通过二维码登录
docker logs -f wechat-chatgpt
```

## 更新Docker镜像版本

```sh
docker pull holegots/wechat-chatgpt:latest
docker stop wechat-chatgpt
docker rm wechat-chatgpt
# 在Linux或WindowsPowerShell上运行如下命令
docker run -d --name wechat-chatgpt -v $(pwd)/config.yaml:/app/config.yaml holegots/wechat-chatgpt:latest
# 在Windows command line (cmd)中, 您需要像这样修改上述代码的挂载目录:
docker run -d --name wechat-chatgpt -v %cd%/config.yaml:/app/config.yaml holegots/wechat-chatgpt:latest
# 通过二维码登录
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

⚠️ 触发关键字必须出现在接收到的消息的第一个位置⚠️

请确保您的终端网络可以登陆 OpenAI。如果登陆失败，请尝试使用代理或使用 SessionToken 方法配置

**设置代理:**

```sh
export http_proxy=<Your Proxy>
```

#### **B: 使用 Session Token**

如果您无法使用账号密码登陆您的 OpenAI 账户，或者您的终端网络不支持连接到 OpenAI，那么您可以尝试使用 Session Token，请根据如下指示获取：

1. 前往 <https://chat.openai.com/chat> 并登陆。
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

## 使用 Railway 部署

[Railway](https://railway.app/) 是一个部署平台，您可以在其上配置基础架构，在本地使用该基础架构进行开发，然后将其部署到云端。本部分将描述如何快速使用 Railway 部署一个 wechat-chatgpt 项目。  

首先，您需要注册一个 Railway 帐户，并使用 GitHub 验证登录。  

然后点击下面的一键部署按钮进行部署。  

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/BHJD6L?referralCode=FaJtD_)

完成一些验证操作后，就可以开始部署了。您将看到以下界面：  

![railway-deployment](docs/images/railway-deployment.png)  

您需要配置一些环境变量：  

- **CHAT_GPT_EMAIL** ：您的 OpenAI 帐户电子邮件，如果您有 session_token，则可不填。

- **CHAT_GPT_PASSWORD** ：您的 OpenAI 帐户密码，如果您有 session_token，则可不填。

- **CHAT_GPT_SESSION_TOKEN** ：您的 OpenAI 帐户 session_token，如果您有电子邮件和密码，则可选。请参见 [这里](#b-使用-session-token) 获取 token。

- **CHAT_GPT_RETRY_TIMES** ：当 OpenAI API 返回 429 或 503 时重试的次数。

- **CHAT_PRIVATE_TRIGGER_KEYWORD** ：如果您希望只有一些关键字才能在私人聊天中触发 chatgpt，则可以设置它。

点击“部署”按钮，您的服务将立即开始部署。以下界面出现表示部署已经开始：  

![railway-deploying](docs/images/railway-deploying.png)  

当部署过程显示为成功后，点击查看日志，在部署日志中找到微信登录链接：  

![railway-deployed](docs/images/railway-deployed.png)

点击链接，使用准备好的微信扫码登录。

成功登录并开始发送和接收消息（此过程可能需要几分钟）：  

![railway-success](docs/images/railway-succeed.png)

此外，在部署中，您可能会遇到以下问题：

- **Error: ⚠️ No chatgpt item in pool**：此错误表示验证信息有问题。您可以从以下几个方面解决此问题：1.检查 token 或 openAI 账号和密码是否正确填写。2. token 可能已经过期（经验表明 token 的过期时间为**24**小时），您可以到 chatGPT 官网重新获取 token。3. 重新部署当前服务。请注意，应在铁路仪表板的 **Variables** 页面上修改上述内容。
- **部署完成后，不会生成二维码**。尝试**刷新**页面，再次查看 Deploy Logs 面板是否生成了链接和二维码。
- **生成的二维码无法扫描**。在生成的二维码上，有一个链接可以点击扫描二维码。
- **消息反馈缓慢**。由于 Railway 的服务器部署在海外，消息反馈延迟会有所增加，但仍在可接受范围内。如果您对时间敏感，则可以使用自己的服务器部署。

## 作者

👤 **holegots**

- Twitter: [@fuergaosi](https://twitter.com/fuergaosi)
- GitHub: [@fuergaosi233](https://github.com/fuergaosi233)

## 🤝 为项目添砖加瓦

欢迎提出 Contributions, issues 与 feature requests!<br />随时查看 [issues page](https://github.com/fuergaosi233/wechat-chatgpt/issues).

## 感谢支持 🙏

如果这个项目对你产生了一点的帮助，请为这个项目点上一颗 ⭐️
