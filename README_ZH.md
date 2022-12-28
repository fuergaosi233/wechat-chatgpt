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

### 2022.12.27 更新
目前, 使用 Docker 或 Railway 部署, 会出现意料之外的问题, 我们正在努力解决。

### 2022.12.20 更新

感谢 @transitive-bullshit 的工作, 使得ChatGPT API可以自动完成这项工作。
现在可以使用密码的用户名来登录, 并配置打码 [CAPTCHAs](#CAPTCHAS) 来使得整个流程全自动化.


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

## 安装

```sh
npm install && poetry install
```

## 配置

### 复制配置文件

将配置文件复制一份以配置您的项目

```sh
cp config.yaml.example config.yaml
```

### 获取 OpenAI 的账户并配置到项目中

> 如果你没有 OpenAI 的账号，并且您在无法访问 OpenAI 的国家或地区，你可以查看[here](https://mirror.xyz/boxchen.eth/9O9CSqyKDj4BKUIil7NC1Sa1LJM-3hsPqaeW_QjfFBc).

#### 配置方法 A：使用账号密码

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
编辑配置文件 `config.yaml`
```yaml
openAIProxy: <代理地址>
```

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
## 作者

👤 **holegots**

- Twitter: [@fuergaosi](https://twitter.com/fuergaosi)
- GitHub: [@fuergaosi233](https://github.com/fuergaosi233)

## 🤝 为项目添砖加瓦

欢迎提出 Contributions, issues 与 feature requests!<br />随时查看 [issues page](https://github.com/fuergaosi233/wechat-chatgpt/issues).

## 感谢支持 🙏

如果这个项目对你产生了一点的帮助，请为这个项目点上一颗 ⭐️
