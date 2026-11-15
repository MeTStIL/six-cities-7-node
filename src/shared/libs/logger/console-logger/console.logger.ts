import { ILogger } from '../logger.interface';

export class ConsoleLogger implements ILogger {
  public debug(message: string, ...args: Array<unknown>): void {
    console.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: Array<unknown>): void {
    console.error(message, ...args);
    console.error(`Error message: ${error}`);
  }

  public info(message: string, ...args: Array<unknown>): void {
    console.info(message, ...args);
  }

  public warn(message: string, ...args: Array<unknown>): void {
    console.warn(message, ...args);
  }
}
