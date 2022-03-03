import findFile from './src/utils'

const file = findFile(process.cwd(), 'preload.json')
const preloadFile = file.substring(0, file.indexOf('preload.json'))
console.log(preloadFile)
