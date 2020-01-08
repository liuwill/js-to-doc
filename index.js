const chalk = require('chalk')
const through = require('through2')
const gulp = require('gulp')
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

const main = () => {
  const sourceList = config.project.source.map(source => path.resolve(source))
  const filename = config.project.filename
  const target = config.project.target

  console.log(sourceList)
  console.log('Start Concat:', chalk.yellow(filename))
  return runTask(sourceList, filename, target).then(() => {
    console.log(chalk.blue('Concat:'), chalk.gray(path.join(target, filename)))

    const source = path.resolve(config.project.target, config.project.filename)
    const docName = path.join(config.doc.target, config.doc.filename)
    return generator.generateDoc(source, docName)
  }).then((docName) => {
    console.log(chalk.green('Generated:'), chalk.gray(docName))
  })
}

main().catch((err) => {
  console.log(chalk.red(err.message))
  process.exit(1)
})
