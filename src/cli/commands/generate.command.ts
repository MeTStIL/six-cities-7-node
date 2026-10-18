import { ICommand } from './command.interface';
import { IMockServerData, request, TsvOfferGenerator } from '../../shared';
import chalk from 'chalk';
import { TsvFileWriter } from '../../shared/libs/file-writer';

export class GenerateCommand implements ICommand {
  private initialData!: IMockServerData;

  public getName(): string {
    return '--generate';
  }

  private async load(url: string): Promise<void> {
    try {
      this.initialData = await request<IMockServerData>(url);
    } catch (error) {
      throw new Error(`Can't load data from ${url}. ${error}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TsvOfferGenerator(this.initialData);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public async execute(...parameters: [string?, string?, string?]): Promise<void> {
    const [count, filepath, url] = parameters;

    if (!count || !filepath || !url) {
      throw new Error('Missing required arguments: <count> <filepath> <url>');
    }
    const offerCount = Number.parseInt(count, 10);

    if (Number.isNaN(offerCount) || offerCount <= 0) {
      throw new Error('The <count> parameter must be a valid positive number');
    }

    await this.load(url);
    await this.write(filepath, offerCount);

    console.info(chalk.green(`File ${filepath} was created!`));
  }
}
