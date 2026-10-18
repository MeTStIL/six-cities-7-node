import chalk from 'chalk';

export const printError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(chalk.red(error.message));
  } else {
    console.error(chalk.red('ERROR'), error);
  }
};
