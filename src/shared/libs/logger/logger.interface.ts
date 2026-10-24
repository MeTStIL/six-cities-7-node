export interface ILogger {
  info: (message: string, ...args: Array<unknown>) => void;
  warn: (message: string, ...args: Array<unknown>) => void;
  error: (message: string, error: Error, ...args: Array<unknown>) => void;
  debug: (message: string, ...args: Array<unknown>) => void;
}
