"use strict";

const help = require(`./help`);
const generate = require(`./generate`);
const version = require(`./version`);
const server = require(`./server/server`);

const Cli = {
  [server.name]: server,
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
};

module.exports = {
  Cli,
};
