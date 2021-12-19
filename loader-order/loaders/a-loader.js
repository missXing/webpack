const loaderUtils = require('loader-utils');

module.exports = function(source) {
    console.log('Loader a is excuted!');

    // 文件的读写
    const url = loaderUtils.interpolateName(this, '[name].[ext]', source);

    console.log(url);
    this.emitFile(url, source);
    return source;
}