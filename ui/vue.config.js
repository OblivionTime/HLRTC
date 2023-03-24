/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-08-12 14:51:35
 * @LastEditors: solid
 * @LastEditTime: 2022-11-03 12:09:37
 */
const path = require('path')
const fs = require('fs')
module.exports = {
    publicPath: './',
    outputDir: 'ui',
    assetsDir: './static',
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        open: false,
        https: {
            cert: fs.readFileSync(path.join(__dirname, 'src/ssl/server.crt')),
            key: fs.readFileSync(path.join(__dirname, 'src/ssl/server.key'))
        },
        overlay: {
            warnings: false,
            errors: true
        },
    }
}
