require('babel-register');

const getCapabilities = () => {
  return [{
    browserName: 'chrome'
  }];
};

exports.config = {
  specs: [
    './test/e2e/*.test.js'
  ],
  maxInstances: 5,
  capabilities: getCapabilities(),
  sync: true,
  logLevel: 'verbose',
  coloredLogs: true,
  baseUrl: 'http://localhost:8080',
  waitforTimeout: 1e4,
  connectionRetryTimeout: 3e4,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 6e4
  }
};
