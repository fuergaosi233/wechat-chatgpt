export interface IConfig {
  api: string;
  openai_api_key: string;
  model: string;
  chatTriggerRule: string;
  disableGroupMessage: boolean;
  temperature: number;
  blockWords: string[];
  chatgptBlockWords: string[];
  chatPrivateTriggerKeyword: string;
}
