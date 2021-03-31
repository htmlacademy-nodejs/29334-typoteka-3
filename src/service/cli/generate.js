"use strict";

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../../utils.js`);
const {
  ExitCode,
  DAY_LENGTH_MILLISECONDS,
  MAX_ID_LENGTH,
} = require(`../../constants.js`);
const {nanoid} = require(`nanoid`);
const FILE_ANNOUNCE_PATH = `./data/announce.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;
const DEFAULT_COUNT = 1;
const MAX_POSTS = 1000;
const MAX_COMMENTS = 5;
const FILE_NAME = `mocks.json`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generatePosts = (cnt, titles, announces, categories, comments) => {
  return new Array(cnt).fill(``).map(() => {
    const rndDate = new Date(
        Date.now() - getRandomInt(1, 91) * DAY_LENGTH_MILLISECONDS
    );
    return {
      id: nanoid(MAX_ID_LENGTH),
      title: titles[getRandomInt(0, titles.length - 1)],
      createdDate: `${rndDate.toLocaleDateString()} ${rndDate.toLocaleTimeString()}`,
      announce: shuffle(announces).slice(0, 5).join(` `),
      fullText: shuffle(announces)
        .slice(0, getRandomInt(0, announces.length - 1))
        .join(` `),
      category: [categories[getRandomInt(0, categories.length - 1)]],
      comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
    };
  });
};

const generateComments = (count, comments) =>
  Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `),
    }));

module.exports = {
  name: `--generate`,
  async run(args) {
    const [cnt] = args;
    const announces = await (await readContent(FILE_ANNOUNCE_PATH)).filter(
        (it) => it !== ``
    );
    const titles = await (await readContent(FILE_TITLES_PATH)).filter(
        (it) => it !== ``
    );
    const categories = await (await readContent(FILE_CATEGORIES_PATH)).filter(
        (it) => it !== ``
    );
    const comments = await (await readContent(FILE_COMMENTS_PATH)).filter(
        (it) => it !== ``
    );
    const countPosts = Number.parseInt(cnt, 10) || DEFAULT_COUNT;
    if (countPosts > MAX_POSTS) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(
        generatePosts(countPosts, titles, announces, categories, comments)
    );
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  },
};
