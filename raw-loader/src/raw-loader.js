const loaderUtils = require('loader-utils')
const fs = require('fs')
const path = require('path');

module.exports = function(source) {

  const {name} = loaderUtils.getOptions(this)
  // 缓存
  // this.cacheable(false);
  console.log('name---', name)
  const json = JSON.stringify(source)
              .replace(/\u2028/g, '\\u2028')
              .replace(/\u2029/g, '\\u2029')
              .replace(/foo/g, 'gg')

  // return `export default ${json}`

  // this.callback(null, json, 2, 3, 4);

  // 异步loader
  const callback = this.async();
  fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
      if (err) {
          callback(err, '');
      }
      callback(null, data);
  });
  
}