const fs = require('fs')
const path = require('path')

const {runLoaders} = require('loader-runner')

runLoaders(
  {
    resource: "./loaders/index.css",
    loaders: [path.join(__dirname, "./loaders/sprite-loader")],
    readResource: fs.readFile.bind(fs)
  },
  (err, res) => (err ? console.error(err) : null)
)