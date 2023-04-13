import { RoomInterface, ContactInterface } from "wechaty/impls";

interface ICommand {
  names: string[];
  params?: string[];
  description: string;
  handler: Function;
}

type Talker = RoomInterface | ContactInterface;

class Commander {
  private commands = new Set<ICommand>(); // All commands
  private commandsNames = new Set<string>(); // All command names and aliases
  private extraHelpText: string[] = []; // Additional help information

  // Special characters that require escaping in WeChat
  private encodedChars: { [key: string]: string } = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&#39;",
    "\"": "&quot;",
    "`": "&#96;"
  }

  constructor() {
    this.addCommand({
      names: ["help", "帮助", "菜单", "h"],
      description: "显示所有命令和说明",
      handler: this.help.bind(this),
    });
  }

  private encodeString = (text: string) => {
    const regex = new RegExp(`[${Object.keys(this.encodedChars).join("")}]`, "g")
    return text.replace(regex, (match: string) => this.encodedChars[match])
  }

  private help = async (talker: Talker) => {
    const helpText = [`命令列表：`];
    for (const { names: [name, ...aliases], params = [], description } of this.commands) {
      helpText.push(`\n\n/cmd ${name}${params.length ? ` ${params.join(" ")}` : ""}`);
      helpText.push(`\n# ${description}`);
      if (aliases.length) helpText.push(`\n# 别名：${aliases.join(", ")}`);
    }

    if (this.extraHelpText.length) {
      for (const text of this.extraHelpText) {
        helpText.push(`\n\n${text}`);
      }
    }

    return helpText.join("");
  };

  addHelpText = (helpText: string) => {
    helpText = helpText.trim();
    if (helpText) this.extraHelpText.push(helpText);
  }

  addCommand = ({ names, params = [], description, handler }: ICommand) => {
    names = names.map(name => name.toLowerCase());
    const existingCommandName = names.find(name => this.commandsNames.has(name));
    if (existingCommandName) {
      const nameType = existingCommandName !== names[0] ? " alias" : "";
      console.warn(`Command${nameType} already exists: ${existingCommandName}`);
      return;
    }
    this.commands.add({ names, params, description, handler });
    names.forEach(name => this.commandsNames.add(name));
  };

  exec = async (talker: Talker, rawText: string) => {
    const text = rawText.trim();
    if (!text) {
      await talker.say("请输入要执行的命令");
      return;
    }

    let [commandName, ...params] = text.split(" "); // Separate command and parameters
    commandName = commandName.toLowerCase();
    for (const command of this.commands) {
      if (command.names.includes(commandName)) {
        try {
          const param = params.join(" ");
          console.info(`🤖 Command: /${commandName} ${param}`);
          const result = await command.handler(talker, params.length <= 1 ? param : params);
          if (result) await talker.say(this.encodeString(result));
        } catch (e) {
          console.error(`Command: /${commandName}, execution error: ${e}`);
          await talker.say("命令执行出错");
        }
        return;
      }
    }
    await talker.say(`未知命令：${text}`);
  };

}

export const commander = new Commander();
