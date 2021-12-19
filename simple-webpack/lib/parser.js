// 实现es6 到 es5的转化
// 分析依赖
const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core');

module.exports = {

  // 根据path通过babylon将代码转化为ast
  getAst: (path) => {
    const soure = fs.readFileSync(path, 'utf-8')

    return babylon.parse(soure, {
      sourceType: 'module'
    })
  },

  // 使用babel-traverse分析依赖
  getDependencies: (ast) => {
    const dependencies = [];

    traverse(ast, {
      // 分析import语句
      ImportDeclaration: ({node}) => {
        // 获取依赖内容
        dependencies.push(node.source.value)
      }
    })

    return dependencies
  },

  // 通过babel-core将ast转换为es5
  transform: (ast) => {
    const {code} = transformFromAst(ast, null, {
      presets: ['env']
    })

    return code
  }
}