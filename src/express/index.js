"use strict";

const express = require(`express`);
const { PORT } = require(`../constants`);
const {
  articlesRouter,
  categoriesRouter,
  loginRouter,
  mainRouter,
  myRouter,
  registerRouter,
  searchRouter,
} = require(`./routes/index`);

const app = express();
app.listen(PORT);

app.use(`/`, mainRouter);
app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);
app.use(`/search`, searchRouter);
app.use(`/categories`, categoriesRouter);
