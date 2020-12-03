"use strict";

const express = require(`express`);
const path = require(`path`);
const {PORT, PUBLIC_DIR} = require(`../constants`);
const {articlesRoutes, mainRoutes, myRoutes} = require(`./routes/index`);

const app = express();
app.listen(PORT);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/`, mainRoutes);
