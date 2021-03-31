"use strict";

// const chalk = require(`chalk`);
const express = require(`express`);
const {API_DEFAULT_PORT, HttpCode} = require(`../../constants`);
// const {postRoutes} = require(`./server/post-routes`);
const app = express();
app.use(express.json());
// app.use(`/posts`, postRoutes);
const routes = require(`../api`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `api`});

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

app.use(`/api`, routes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occured on processing request: ${err.message}`);
});

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || API_DEFAULT_PORT;
    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(
              `An error occured on server creation: ${err.message}`
          );
        }

        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
  },
};
