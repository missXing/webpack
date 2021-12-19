const {getAst, getDependencies, transform} = require('./parser')
const path = require('path')

const ast = getAst(path.join(__dirname, '../src/index.js'))

const dependencies = getDependencies(ast)

const source = transform(ast)

console.log(source)