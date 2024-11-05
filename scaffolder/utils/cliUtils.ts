import readline from 'readline';
import chalk from 'chalk';

// Initialize readline interface for CLI interactions
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Utility function for prompting a question and getting an answer
export const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(chalk.cyan(question + ' '), (answer) => {
      resolve(answer.trim());
    });
  });
};

// Utility for confirming an action, color-coded to distinguish question type
export const askConfirmation = async (question: string): Promise<boolean> => {
  const answer = await askQuestion(chalk.yellow(`${question} (y/n): `));
  return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
};

// Utility to validate a non-empty answer, re-prompts if empty, with warning color
export const requireNonEmpty = async (question: string): Promise<string> => {
  let answer = '';
  while (!answer) {
    answer = await askQuestion(chalk.cyan(question + ' '));
    if (!answer) {
      console.log(
        chalk.red('Answer cannot be empty. Please provide a valid input.')
      );
    }
  }
  return answer;
};

// Utility for showing messages to the user, with color coding for types
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

// Close readline interface after all prompts
export const closeCLI = () => rl.close();
