module.exports = {
  // 测试文件入口
  src_folders: ['e2e'],
  // 输出报表路径
  output_folder: 'reports',

  // selenium配置
  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    // selenium log输出
    log_path: 'reports',
    port: 9090,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path,
      'webdriver.gecko.driver': require('chromedriver').path
    }
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: 9090,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: false,
        path: ''
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
};
