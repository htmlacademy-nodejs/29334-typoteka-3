"use strict";

const { Router } = require(`express`);
const categoriesRouter = new Router();

categoriesRouter.get(`/`, (req, res) => res.status(200).send(`/categories`));

module.exports = {
  categoriesRouter,
};
