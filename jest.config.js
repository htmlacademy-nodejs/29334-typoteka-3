"use strict";

module.exports = {
  clearMocks: true,
  testEnvironment: `node`,
  testMatch: [
    `**/?(*.)+(spec|test).[tj]s?(x)`,
  ],
  testPathIgnorePatterns: [`/node_modules/`],
  transformIgnorePatterns: [`/node_modules/`],
  resetMocks: true,
};
