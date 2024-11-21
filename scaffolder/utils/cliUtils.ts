import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { highlight } from 'cli-highlight';

// Consistent display for static messages like headers
export const showHeader = (scriptName: string) => {
  const headerMessage = `*** Starting ${scriptName} ***`;
  console.log(chalk.bgBlue.white.bold(`\n${headerMessage}\n`));
};

// Prompt the user with a general text input
export const askQuestion = async (question: string): Promise<string> => {
  const { answer } = await inquirer.prompt([
    {
      type: 'input',
      name: 'answer',
      message: chalk.cyan(question),
    },
  ]);
  return answer.trim();
};

// Confirm an action with a yes/no prompt
export const askConfirmation = async (question: string): Promise<boolean> => {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: chalk.yellow(question),
    },
  ]);
  return confirm;
};

// Validate non-empty input, with validation to prevent empty answers
export const requireNonEmpty = async (question: string): Promise<string> => {
  const { answer } = await inquirer.prompt([
    {
      type: 'input',
      name: 'answer',
      message: chalk.cyan(question),
      validate: (input) => input.trim() !== '' || 'This field cannot be empty.',
    },
  ]);
  return answer.trim();
};

// Directory autocomplete prompt
export const askForDirectory = async (question: string): Promise<string> => {
  const { directory } = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'directory',
      message: chalk.cyan(question),
      // Use a custom autocomplete function for navigating directories
      source: async (_, input = '') => {
        const baseDir = path.resolve('.');
        const inputPath = path.join(baseDir, input);
        const dirs = fs
          .readdirSync(inputPath, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => path.join(input, dirent.name));
        return dirs;
      },
    },
  ]);
  return directory;
};

// Show messages to the user, color-coded for type
export const showMessage = (
  message: string,
  type: 'info' | 'success' | 'error' = 'info'
) => {
  const colorizedMessage =
    type === 'info'
      ? chalk.blueBright(`[INFO] ${message}`)
      : type === 'success'
      ? chalk.green(`[SUCCESS] ${message}`)
      : chalk.red(`[ERROR] ${message}`);
  console.log(colorizedMessage);
};

/**
 * Highlights TypeScript code and prints it to the console.
 *
 * @param code - The TypeScript code to preview.
 */
export function previewCode(code: string): void {
  const highlightedCode = highlight(code, {
    language: 'typescript',
    ignoreIllegals: true,
  });
  console.log(highlightedCode);
}

// Close the readline interface (no longer needed when using `inquirer`)
export const closeCLI = () => process.exit(0);
