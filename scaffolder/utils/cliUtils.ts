import readline from 'readline';

// Initialize readline interface for CLI interactions
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Utility function for prompting a question and getting an answer
export const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
};

// Utility for confirming an action
export const askConfirmation = async (question: string): Promise<boolean> => {
  const answer = await askQuestion(`${question} (y/n): `);
  return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
};

// Utility to validate a non-empty answer
export const requireNonEmpty = async (question: string): Promise<string> => {
  let answer = '';
  while (!answer) {
    answer = await askQuestion(question);
    if (!answer) {
      console.log('Answer cannot be empty. Please provide a valid input.');
    }
  }
  return answer;
};

// Utility for showing messages to the user
export const showMessage = (
  message: string,
  type: 'info' | 'success' | 'error' = 'info'
) => {
  const prefix =
    type === 'info' ? '[INFO]' : type === 'success' ? '[SUCCESS]' : '[ERROR]';
  console.log(`${prefix} ${message}`);
};

// Close readline interface after all prompts
export const closeCLI = () => rl.close();
