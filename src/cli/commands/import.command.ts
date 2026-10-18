import { ICommand } from './command.interface';
import { createOffer, TsvFileReader } from '../../shared';
import chalk from 'chalk';

export class ImportCommand implements ICommand {
  public getName(): string {
    return '--import';
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(chalk.green(`\n${count} rows imported.`));
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TsvFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    await fileReader.read();
  }
}
