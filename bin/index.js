#! /usr/bin/env node
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var targetFile = path.resolve(process.cwd(), './package.json');

var log = console.log;
var error = chalk.red;
var info = chalk.green;

try {
  if (fs.existsSync(targetFile)) {
    var content = fs.readFile(targetFile, 'utf8', function (err, content) {
      var contentJSON = JSON.parse(content)
      var scripts = contentJSON['scripts'];
      if (!scripts) {
        log(error('no command'))    
      } else {
        log()
        for (const key in scripts) {
          if (scripts.hasOwnProperty(key)) {
            const element = scripts[key];
            log(`${info(key)} ${element}`)
          }
        }
        log()
      }
    })
  } else {
    log(error('package.json is not exist'))
    exit(1)
  }
} catch (error) {
  log(error(error))
  exit(1)
}