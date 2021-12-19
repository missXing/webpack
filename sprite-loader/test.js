const Spritesmith = require('spritesmith')

const fs = require('fs')
const path = require('path')

const sprites = ['./loaders/image/1.jpeg', './loaders/image/2.jpeg']

Spritesmith.run({src: sprites}, (err, res) => {
  console.log(res.image) // 图片buffer
  console.log(res.coordinates) // 合成前图片信息
  console.log(res.properties) // 合成后图片信息
  fs.writeFileSync(path.join(__dirname, 'dist/sprite.jpeg'), res.image)
})