"use strict";

const { articlesRouter } = require(`./articles`);
const { categoriesRouter } = require(`./categories`);
const { loginRouter } = require(`./login`);
const { mainRouter } = require(`./main`);
const { myRouter } = require(`./my`);
const { registerRouter } = require(`./register`);
const { searchRouter } = require(`./search`);

module.exports = {
  articlesRouter,
  categoriesRouter,
  loginRouter,
  mainRouter,
  myRouter,
  registerRouter,
  searchRouter,
};
