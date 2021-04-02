"use strict";

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  success: 0,
  error: 1,
};

const DAY_LENGTH_MILLISECONDS = 1000 * 60 * 60 * 24;

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const PORT = 8080;

const PUBLIC_DIR = `public`;

const MOCKS_FILENAME = `mocks.json`;

const MAX_ID_LENGTH = 6;

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  DAY_LENGTH_MILLISECONDS,
  HttpCode,
  PORT,
  PUBLIC_DIR,
  MOCKS_FILENAME,
  MAX_ID_LENGTH,
  Env,
};
