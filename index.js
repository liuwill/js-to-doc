const chalk = require('chalk')
const through = require('through2')
const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const concat = require('gulp-concat')
const config = require('./config')
const generator = require('./generator')

const runTask = function (sourceList, filename, target) {
  return new Promise(function(resolve, reject) {
    gulp.src(sourceList)
      .pipe(concat(filename))
      .pipe(gulp.dest(target))
      .pipe((function(file, opt) {
        if (!file) {
          reject(new Error('gulp-concat: Missing file option'))
          return
        }

        console.log(chalk.magenta('Running...'))
        return through.obj(function(file, enc, cb) {
          cb()
          resolve(true)
        }, function(cb) {
          cb()
          reject(new Error('File Not Found'))
        })
      })(filename))
  })

}

const readConfig = () => {
  const argv =  process.argv
  const configPath = argv[2]
  if (!configPath) {
    return config
  }
  const filePath = path.resolve(configPath)
  if (!fs.existsSync(filePath)) {
    return config
  }
  if (!fs.statSync(filePath).isFile()) {
    return config
  }

  return require(filePath)
}

const main = () => {
  const mainConfig = readConfig()

  const sourceList = mainConfig.project.source.map(source => path.resolve(source))
  const filename = mainConfig.project.filename
  const target = mainConfig.project.target

  console.log('Start Concat:', chalk.yellow(filename))
  return runTask(sourceList, filename, target).then(() => {
    console.log(chalk.blue('Concat:'), chalk.gray(path.join(target, filename)))

    const source = path.resolve(mainConfig.project.target, mainConfig.project.filename)
    const docName = path.join(mainConfig.doc.target, mainConfig.doc.filename)
    return generator.generateDoc(source, docName, mainConfig.doc['line'] || 0)
  }).then((docName) => {
    console.log(chalk.green('Generated:'), chalk.gray(docName))
  })
}

main().catch((err) => {
  console.log(chalk.red(err.message))
  process.exit(1)
})
