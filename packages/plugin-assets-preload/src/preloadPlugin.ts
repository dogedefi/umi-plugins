import fs from 'fs'
import path from 'path'
import findFile from './utils'

const hashFileRegex = /([^\s"]*)(\.[\d\w]*)(\.png|jpe?g)/
const fileRegex = /([^\s"]*)(\.png|jpe?g)/
const assetsJosnPath = findFile(process.cwd(), 'preload.json')
const location = assetsJosnPath.substring(0, assetsJosnPath.indexOf('preload.json') - 1)
const hashAssetsJosnPath = path.join(location, 'preload.hash.json')

function transfer(source: string[], compiled: string[]) {
  return source.map((file: string) => {
    const match = file.match(fileRegex)
    if (match) {
      const [fullname, filename, ext] = match
      const hashFile = compiled.find((cfile: string) => cfile.startsWith(filename))
      return hashFile
    }

    return ''
  })
}

export default class PreloadPlugin {
  apply(compiler: any) {
    compiler.hooks.afterCompile.tapAsync(this.constructor.name, (compilation: any, callback: () => void) => {
      try {
        if (fs.existsSync(assetsJosnPath)) {
          const compiledAssets = compilation.getAssets().map((item: any) => item.name.replace('static/', ''))
          const assets = require(assetsJosnPath)

          const pcAssets = {
            common: transfer(assets.pc.common, compiledAssets),
            pages: Object.entries(assets.pc.pages).reduce((prev, [k, v]) => {
              prev[k] = transfer(v as string[], compiledAssets)
              return prev
            }, {})
          }
          const mobileAssets = {
            common: transfer(assets.mobile.common, compiledAssets),
            pages: Object.entries(assets.mobile.pages).reduce((prev, [k, v]) => {
              prev[k] = transfer(v as string[], compiledAssets)
              return prev
            }, {})
          }

          // write inputs to src/preload.hash.json
          fs.writeFileSync(
            hashAssetsJosnPath,
            JSON.stringify(
              {
                pc: pcAssets,
                mobile: mobileAssets
              },
              null,
              '\t'
            ),
            { encoding: 'utf-8' }
          )
        }
      } catch (error) {
        console.warn('preload.json not found')
      } finally {
        callback()
      }
    })
  }
}
