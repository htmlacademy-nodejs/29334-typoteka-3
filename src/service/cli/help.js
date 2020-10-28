"use strict";

const chalk = require(`chalk`);

module.exports = {
  name: `--help`,
  run() {
    console.info(
      chalk.magenta(`
        Гайд:
        service.js <command>
        Команды:
        --version:            выводит номер версии
        --help:               печатает этот текст
        --generate <count>    формирует файл mocks.json
    `)
    );
  },
};
