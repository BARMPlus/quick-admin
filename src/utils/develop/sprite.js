const SpriteTool = require('sprite-tool')
let sprite = new SpriteTool({
  iconPath: 'src/sprites/image', // 目标路径
  targetPath: 'src/sprites/sprite', // 生成路径
  name: 'index', // 生成文件名
  isRetina: false, // 是否开启三倍图模式
  isRem: false // 是否开启rem
})
sprite.run()
