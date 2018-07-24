const shell = require("shelljs");
const Listr = require("listr");
const readline = require("readline");

const lintTasks = require("./lint.js");
const testTasks = require("./test.js");

const PROTECTED_BRANCHES = [
  "master"
];

const booleanPrompt = (branchName) => {
  if (PROTECTED_BRANCHES.indexOf(branchName) === -1) return branchName;

  return (new Promise((resolve, reject) => {
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.question(`You are on ${branchName}. Do you still want to push? (y/n) `, (input) => {
      rl.close();
      resolve(input);
    });
  })).then((response = "") => {
    if (!response.match(/^[Yy]/)) {
      throw new Error(`On ${branchName}. User declined to push.`);
    }

    return response;
  });
};

const getCurrentGitBranchName = async () => new Promise((resolve, reject) => {
  shell.exec(`git rev-parse --abbrev-ref HEAD`, { silent: true }, (code, stdout) => {
    if (code !== 0) {
      reject(new Error());
    }
    resolve(stdout);
  });
});

const tasks = new Listr([
    {
      title: "Run lint",
      task: () => lintTasks
    },
    {
      title: "Run Tests",
      task: () => testTasks
    }
  ],
  {
    concurrent: true,
  });

const confirmPushOnMaster = new Listr([{
  title: "Run Code Quality Checks",
  task: () => tasks
}], {
  exitOnError: true,
});

const confirmPushIfOnMaster = async () => {
  await getCurrentGitBranchName()
    .then(booleanPrompt);

  return confirmPushOnMaster.run().catch((err) => {});
};


confirmPushIfOnMaster();
