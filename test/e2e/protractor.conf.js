exports.config = {
  seleniumServerJar: '../../node_modules/gulp-protractor/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
  framework: 'mocha',
  multiCapabilities: [
    { browserName: 'chrome' }
  ],
  onPrepare: () => {
    require("babel-register");
    browser.ignoreSynchronization = true;
  }
};
