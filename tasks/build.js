const pkg = require('../package.json')
const fs = require('fs')
const chalk = require('chalk')
const rm = require('rimraf').sync
const browserify = require('browserify')

const PACKAGE_NAME = pkg.name
const PACKAGE_VERSION = pkg.version
const DIST_PATH = './dist/markdown-it-linkify-images.js'

console.log(chalk.yellow('Beginning build process for ' + PACKAGE_NAME + ' version v' + PACKAGE_VERSION))

console.log(chalk.gray('Removing dist directory and recreating it'))

rm('./dist')

console.log(chalk.green('Finishing cleaning dist directory.'))

console.log(chalk.gray('Creating new dist directory'))
fs.mkdirSync('./dist')
console.log(chalk.green('The dist directory was created'))

console.log(chalk.gray('Bunding files with browserify'))
const distStream = fs.createWriteStream(DIST_PATH)

distStream.on('error', function (err) {
  console.error(chalk.red('There was a problem in the dist stream'))
  console.error(err)
})

const b = browserify({
  standalone: 'markdownit-linkify-images'
})

b.add('./index.js')
b.bundle().pipe(distStream)
console.log(chalk.green('Bundling is complete'))
