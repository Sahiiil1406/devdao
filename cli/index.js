#!/root/.nvm/versions/node/v20.18.1/bin/node
const inquirer = require('inquirer');
const { cloneRepo, submitProblem } = require('./helper'); // Ensure these functions are defined in 'helper.js'

console.log('Hello, welcome to the DevDao CLI!');

// First, prompt the user to select between "clone" or "submit"
inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Clone a Repo', 'Submit a Problem'],
    },
  ])
  .then((answers) => {
    const { action } = answers;

    // Depending on the selected action, prompt for an ID
    if (action === 'Clone a Repo') {
      return inquirer.prompt([
        {
          type: 'input',
          name: 'cloneId',
          message: 'Please enter the ID to clone the repo:',
        },
      ]);
    } else if (action === 'Submit a Problem') {
      return inquirer.prompt([
        {
          type: 'input',
          name: 'submitId',
          message: 'Please enter the ID to submit the problem:',
        },
      ]);
    }
  })
  .then((answers) => {
    const { cloneId, submitId } = answers;

    if (cloneId) {
      // If the user is cloning a repo, call the cloneRepo function
      return cloneRepo(cloneId).then(() => {
        console.log('Successfully cloned the repo!');
      });
    } else if (submitId) {
      // If the user is submitting a problem, call the submitProblem function
      return submitProblem(submitId).then(() => {
        console.log('Successfully submitted the problem!');
      });
    }
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });
