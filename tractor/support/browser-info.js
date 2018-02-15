"use strict";

var _logger = require("@tractor/logger");

var _bluebird = _interopRequireDefault(require("bluebird"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies:
module.exports = function () {
  this.After(function (scenario) {
    var browser = global.browser;

    if (browser && scenario.isFailed()) {
      return _bluebird.default.all([getBrowserLog(browser), takeScreenshot(browser, scenario)]);
    } else {
      return _bluebird.default.resolve();
    }
  });
};

function getBrowserLog(browser) {
  return browser.manage().logs().get('browser').then(function (browserLog) {
    browserLog.forEach(function (log) {
      /* eslint-disable no-console */
      console.error(log.message);
      /* eslint-enable no-console */
    });
  }).catch(function () {
    return (0, _logger.error)('Could not get browser log.');
  });
}

function takeScreenshot(browser, scenario) {
  return browser.takeScreenshot().then(function (base64png) {
    var decodedImage = new Buffer(base64png, 'base64');
    scenario.attach(decodedImage, 'image/png');
  }).catch(function () {
    return (0, _logger.error)('Could not take browser screenshot.');
  });
}