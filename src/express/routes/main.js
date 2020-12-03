"use strict";

const {Router} = require(`express`);
const mainRoutes = new Router();

mainRoutes.get(`/`, (req, res) => res.status(200).render(`main`));
mainRoutes.get(`/categories`, (req, res) =>
  res.status(200).render(`all-categories`)
);
mainRoutes.get(`/register`, (req, res) => res.status(200).render(`sign-up`));
mainRoutes.get(`/search`, (req, res) => res.status(200).render(`search`));
mainRoutes.get(`/login`, (req, res) => res.status(200).render(`login`));

module.exports = {
  mainRoutes,
};
