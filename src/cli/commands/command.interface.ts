export interface ICommand {
  getName: () => string;
  execute: (...parameters: Array<string>) => Promise<void>;
}
