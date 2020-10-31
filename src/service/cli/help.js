"use strict";

const chalk = require(`chalk`);

module.exports = {
  name: `--help`,
  run() {
    console.info(
      chalk.grey(`
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
