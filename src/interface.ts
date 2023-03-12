export interface IConfig {
  openai_api_key: string;
  model: string;
  chatPrivateTiggerKeyword: string;
  chatTiggerRule: string;
  disableGroupMessage: boolean;
  temperature: number;
  blockWords: string[];
  chatgptBlockWords: string[];
}
