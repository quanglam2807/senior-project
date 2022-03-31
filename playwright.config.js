// playwright.config.js
// @ts-check
// eslint-disable-next-line import/no-extraneous-dependencies
const config = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
  },
};

module.exports = config;
