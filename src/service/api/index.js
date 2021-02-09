"use strict";

const {Router} = require(`express`);
const category = require(`./category`);
const articles = require(`./articles`);
const search = require(`./search`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  SearchService,
  ArticlesService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  articles(app, new ArticlesService(mockData), new CommentService());
})();

module.exports = app;
