module.exports = {
  'test trackDom': function (browser) {
    browser
      .url('http://127.0.0.1:5500/example/trackDom.html')
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .end();
  }
};
