"use strict";

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  success: 0,
  error: 1,
};

const DAY_LENGTH_MILLISECONDS = 1000 * 60 * 60 * 24;

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  DAY_LENGTH_MILLISECONDS,
};
