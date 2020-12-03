"use strict";

const {Router} = require(`express`);
const articlesRoutes = new Router();

articlesRoutes.get(`/add`, (req, res) => res.status(200).render(`new-post`));
articlesRoutes.get(`/:id`, (req, res) => res.status(200).render(`post`));
articlesRoutes.get(`/edit/:id`, (req, res) =>
  res.status(200).render(`new-post`)
);
articlesRoutes.get(`/category/:id`, (req, res) =>
  res.status(200).render(`articles-by-category.pug`)
);

module.exports = {
  articlesRoutes,
};
