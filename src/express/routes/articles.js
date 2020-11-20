"use strict";

const { Router } = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/add`, (req, res) => res.status(200).send(`/articles/add`));
articlesRouter.get(`/:id`, (req, res) =>
  res.status(200).send(`/articles/` + Number.parseInt(req.params.id, 10))
);
articlesRouter.get(`/edit/:id`, (req, res) =>
  res.status(200).send(`/articles/edit/` + Number.parseInt(req.params.id, 10))
);
articlesRouter.get(`/category/:id`, (req, res) =>
  res
    .status(200)
    .send(`/articles/category/` + Number.parseInt(req.params.id, 10))
);

module.exports = {
  articlesRouter,
};
