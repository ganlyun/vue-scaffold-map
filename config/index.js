const path = require('path')

module.exports = {
  dev: {
    domain: `http://10.43.234.216:9004/flood`,
    assetsPublicPath: '/dist/'
  },
  build: {
    domain: `http://localhost:8080`,
    assetsPublicPath: './dist/'
  }
}
