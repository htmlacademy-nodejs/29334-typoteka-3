"use strict";

// const fs = require(`fs`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
// const util = require(`util`);
const { getRandomInt, shuffle } = require(`../../utils.js`);
const { ExitCode, DAY_LENGTH_MILLISECONDS } = require(`../../constants.js`);
const DEFAULT_COUNT = 1;
const MAX_POSTS = 1000;
const FILE_NAME = `mock.json`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generatePosts = (cnt, titles, categories, sentences) => {
  return new Array(cnt).fill(``).map(() => {
    const rndDate = new Date(
      Date.now() - getRandomInt(1, 91) * DAY_LENGTH_MILLISECONDS
    );
    return {
      title: titles[getRandomInt(0, titles.length - 1)],
      createdDate: `${rndDate.toLocaleDateString()} ${rndDate.toLocaleTimeString()}`,
      announce: shuffle(sentences).slice(0, 5).join(` `),
      fullText: shuffle(sentences)
        .slice(0, getRandomInt(0, sentences.length - 1))
        .join(` `),
      сategory: shuffle(categories).slice(0, categories.length - 1),
    };
  });
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [cnt] = args;
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const countPosts = Number.parseInt(cnt, 10) || DEFAULT_COUNT;
    if (countPosts > MAX_POSTS) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(
      generatePosts(countPosts, titles, categories, sentences)
    );
    try {
      // await util.promisify(fs.writeFile)(FILE_NAME, content);
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  },
};
