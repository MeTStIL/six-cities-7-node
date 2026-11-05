import { ICommand } from './command.interface';
import chalk from 'chalk';
import { DB_NAME } from '../../shared';

export class HelpCommand implements ICommand {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            ${chalk.green('main.cli.js')} ${chalk.bgBlue('--<command>')} ${chalk.bgCyanBright('[--arguments]')}
        Команды:
            --help:                                                         # печатает этот текст
            --version:                                                      # выводит номер версии
            --import <path> <login> <password> <host> <database> <salt>:    # импортирует данные из ${DB_NAME}
            --generate <n> <path> <url>                                     # генерирует произвольное количество тестовых данных
    `);
  }
}
