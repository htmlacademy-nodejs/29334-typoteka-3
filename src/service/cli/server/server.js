"use strict";

const chalk = require(`chalk`);
const express = require(`express`);
const {API_DEFAULT_PORT} = require(`../../../constants`);
const {postRoutes} = require(`./post-routes`);
const app = express();
app.use(express.json());
app.use(`/posts`, postRoutes);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || API_DEFAULT_PORT;
    app.listen(port, (err) =>
      err
        ? console.error(chalk.red(`Ошибка при создании сервера`, err))
        : console.info(chalk.green(`Ожидаю соединений на ${port}`))
    );
  },
};
