const path = require('path'),
  fs = require('fs')

function findFile(startPath: string, filter: string): string {
  if (!fs.existsSync(startPath)) {
    console.log('no such directory', startPath)
    return ''
  }

  const files = fs.readdirSync(startPath)
  const dirs = []
  for (let i = 0; i < files.length; i++) {
    const filename: string = path.join(startPath, files[i])
    const stat = fs.lstatSync(filename)

    if (/node_modules|\.git/gi.test(filename)) {
      continue
    }

    if (stat.isDirectory()) {
      dirs.push(filename) // 统计可以搜索的目录
    } else if (filename.endsWith(filter)) {
      return filename // 优先扫完当前层级的文件
    }

    // 扫不到目标文件，尝试往目录里面扫
    if (files.length === i + 1) {
      for (let j = 0; j < dirs.length; j++) {
        const dir = dirs[j]
        const result = findFile(dir, filter)
        if (result.endsWith(filter)) {
          return result
        }
      }
    }
  }

  return ''
}

export default findFile
