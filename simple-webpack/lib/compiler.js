const fs = require('fs')
const path = require('path')
const {getAst, getDependencies, transform} = require('./parser')

// 模块构建 最后文件的输出
module.exports = class Compiler {

  constructor(options) {
    const {entry, output} = options

    this.entry = entry
    this.output = output
    // 存放所有构建好的模块
    this.modules = []
  }

  run() {
    const entryModule = this.buildModule(this.entry, true)
    // console.log(entryModule)
    this.modules.push(entryModule)
    // 将依赖文件也构建一下
    this.modules.map(_module => {
      _module.dependencies.map(dependency => {
        this.modules.push(this.buildModule(dependency))
      })
    })

    // 输出文件
    this.emitFiles()
  }

  // 模块构建
  //  isEntry： 是否为入口文件（对应的是依赖文件）
  buildModule(filename, isEntry) {
    let ast

    if (isEntry) {
      ast = getAst(filename)
    } else {
      //  process.cwd() 进入根目录
      const absolutePath = path.join(process.cwd(), './src', filename)
      ast = getAst(absolutePath)
    }

    return {
      filename,
      dependencies: getDependencies(ast),
      transformCode: transform(ast)
    }
  }

  // 输出文件
  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename)
    let modules = ''
    this.modules.map(_module => {
      modules += `'${_module.filename}': function (require, module, exports) { ${_module.transformCode} },`
    })

    // 每个模块实现一个包裹
    const bundle = `
    (function(modules) {
      function require(fileName) {
        const fn = modules[fileName];

        const module = {exports: {}};

        fn(require, module, module.exports)

        return module.exports
      }

      require('${this.entry}')
    })({${modules}})
    `

    fs.writeFileSync(outputPath, bundle, 'utf-8')
  }
}