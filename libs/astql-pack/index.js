

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
console.log('Starting the dev web server...');
const port = 8080;
const path = require('path');
const glob= require('glob');
const fs = require('fs');
const options = {
  hot: true,
};
const projectPath  = process.argv[2]
config.module.rules[0].test = projectPath;
config.module.rules[0].use.options = {projectPath};
const server = new WebpackDevServer(webpack(config), options);
async function start() {
  const requires = glob.sync(projectPath+'/**/*',{  nodir: true,
  }).map(file => {
    return `require('${file}')`
  }).join('\n')
  fs.writeFileSync(__dirname + '/requires.js', `
  window.files= {}

  ${requires}

  async function main() {
    console.log(window.files)
    
  }
  main();
  `)
  server.start(port, 'localhost', function (err) {
    if (err) {
      console.error(err);
    }
    console.log('WebpackDevServer listening at localhost:', port);
  });
}
start()