"use strict";

const {Router} = require(`express`);
const myRoutes = new Router();

myRoutes.get(`/`, (req, res) => res.status(200).send(`my`));
myRoutes.get(`/comments`, (req, res) => res.status(200).render(`comments`));

module.exports = {
  myRoutes,
};
