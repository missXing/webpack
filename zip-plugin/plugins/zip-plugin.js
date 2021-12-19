const JSZip = require('jszip');
const path = require('path');
const RawSource = require('webpack-sources').RawSource;
const zip = new JSZip();

module.exports = class ZipPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        // emit 生成文件阶段，读取的是 compilation.assets 对象的值
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            const folder = zip.folder(this.options.filename);

            // compilation 上面的assets 可以用于文件写入
            for (let filename in compilation.assets) {
                const source = compilation.assets[filename].source();
                folder.file(filename, source);
            }

            // 将对象上面的source输出出来
            zip.generateAsync({
                type: 'nodebuffer'
            }).then((content) => {
            //  content 是一个node buffer
                const outputPath = path.join(
                    compilation.options.output.path, 
                    this.options.filename + '.zip'
                );

                const outputRelativePath = path.relative(
                    compilation.options.output.path,
                    outputPath
                );

                // 可以将zip资源包设置在compilation.assets对象上
                compilation.assets[outputRelativePath] = new RawSource(content);

                callback();
            });
        });
    }
}