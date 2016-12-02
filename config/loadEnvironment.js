/**
 * load correct environnemnt depending on process.env.NODE_ENV
 */

import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import colors from 'colors/safe'


// make sure NODE_ENV is defined no matter what
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

if (process.env.NODE_ENV === "production") {
  const PROD_ENV_PATH = path.join(__dirname, '.env_prod');
  try {
    // eslint-disable-next-line no-sync
    fs.statSync(PROD_ENV_PATH);
    dotenv.load({
      path: PROD_ENV_PATH
    });
    // Require 'debug' after env has been setup to ensure it takes into
    // account `process.env.DEBUG`.
    require('debug')('app')(colors.yellow('Using environment variables from `.env_prod`'));
  } catch (e) {
    throw new Error(colors.red(`${PROD_ENV_PATH} does not exist`));
  }
} else {
  const DEV_ENV_PATH = path.join(__dirname, '.env_dev');
  try {
    // eslint-disable-next-line no-sync
    fs.statSync(DEV_ENV_PATH);
    dotenv.load({
      path: DEV_ENV_PATH
    });
    // Require 'debug' after env has been setup to ensure it takes into
    // account `process.env.DEBUG`.
    require('debug')('app')(colors.yellow('Using environment variables from `.env_dev`'));
  } catch (e) {
    throw new Error(colors.red(`${DEV_ENV_PATH} does not exist`));
  }
}
