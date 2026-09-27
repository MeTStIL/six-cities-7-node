import { ICommand } from './command.interface.js';
import { TsvFileReader } from '../../shared/index.js';
import chalk from 'chalk';

export class ImportCommand implements ICommand {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TsvFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(`Details: ${err.message}`);
    }
  }
}
