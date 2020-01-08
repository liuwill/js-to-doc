const chalk = require('chalk')
const through = require('through2')
const gulp = require('gulp')
const path = require('path')
const concat = require('gulp-concat')

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

        return through.obj(function(file, enc, cb) {
          cb()
          resolve(true)
        }, function(cb) {
          cb()
          resolve(true)
        })
      })(filename))
  })

}

const main = () => {
  const sourceList = [path.resolve('../calshop-app-server/lib/**/*.js')]
  const filename = 'calshop-app.js'
  const target = './dist/calshop'

  console.log('Start Concat:', chalk.yellow(filename))
  return runTask(sourceList, filename, target).then(() => {
    console.log(chalk.green('Generated:'), chalk.gray(path.join(target, filename)))
  })
}

main().catch((err) => {
  console.log(chalk.red(err.message))
  process.exit(1)
})
