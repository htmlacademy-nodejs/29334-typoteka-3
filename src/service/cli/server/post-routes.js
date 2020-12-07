"use strict";

const {Router} = require(`express`);
const fs = require(`fs`).promises;
const {join} = require(`path`);
const {MOCKS_FILENAME, HttpCode} = require(`../../../constants`);

const postRoutes = new Router();

postRoutes.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(
      join(__dirname, `..`, `..`, `..`, `..`, MOCKS_FILENAME)
    );
    const mocks = JSON.parse(fileContent);
    return res.json(mocks);
  } catch (err) {
    const empty = [];
    res.status(HttpCode.OK).json(empty);
  }
});

module.exports = {
  postRoutes,
};
