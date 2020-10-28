"use strict";

const fs = require(`fs`);
const chalk = require(`chalk`);
const { getRandomInt, shuffle } = require(`../../utils.js`);
const { ExitCode, DAY_LENGTH_MILLISECONDS } = require(`../../constants.js`);
const {
  MOCK_TITLES,
  MOCK_CATEGORY,
  MOCK_ANNOUNCE,
} = require(`../../mock-constants.js`);
const DEFAULT_COUNT = 1;
const MAX_POSTS = 1000;
const FILE_NAME = `mock.json`;

const generatePosts = (cnt) => {
  return new Array(cnt).fill(``).map(() => {
    const rndDate = new Date(
      Date.now() - getRandomInt(1, 91) * DAY_LENGTH_MILLISECONDS
    );
    return {
      title: MOCK_TITLES[getRandomInt(0, MOCK_TITLES.length - 1)],
      createdDate: `${rndDate.toLocaleDateString()} ${rndDate.toLocaleTimeString()}`,
      announce: shuffle(MOCK_ANNOUNCE).slice(0, 5).join(` `),
      fullText: shuffle(MOCK_ANNOUNCE)
        .slice(0, getRandomInt(0, MOCK_ANNOUNCE.length - 1))
        .join(` `),
      сategory: shuffle(MOCK_CATEGORY).slice(0, MOCK_CATEGORY.length - 1),
    };
  });
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [cnt] = args;
    const countPosts = Number.parseInt(cnt, 10) || DEFAULT_COUNT;
    if (countPosts > MAX_POSTS) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generatePosts(countPosts));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(chalk.red(`Can't write data to file...`));
        process.exit(ExitCode.error);
      }

      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    });
  },
};
