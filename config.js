const path = require('path')
const fs = require('fs')

const setting = {
  config: './setting.json',
  template: './setting.template.json',
}
let config = {}
if (fs.existsSync(path.resolve(setting.config))) {
  config = require(setting.config)
} else if (fs.existsSync(path.resolve(setting.template))) {
  config = require(setting.template)
}

module.exports = config
