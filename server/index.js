const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const morgan = require('morgan')
const serveIndex = require('serve-index')
const https = require('https')
const chalk = require('chalk')

process.env.PWD = process.env.PWD || process.cwd()

const expressApp = express()
const host = `https://127.0.0.1`
const port = 5000

expressApp.set('port', port)
expressApp.use(morgan('dev'))
expressApp.use(bodyParser.json())
expressApp.use(bodyParser.urlencoded({ extended: false }))
expressApp.use(errorHandler())

expressApp.use('/', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

expressApp.get('/plugin-manifest.json', function (req, res) {
  res.sendFile('plugin-manifest.json')
})

expressApp.use('/app', express.static('app'))
expressApp.use('/app', serveIndex('app'))

expressApp.get('/', function (req, res) {
  res.redirect('/app')
})

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
}

https
  .createServer(options, expressApp)
  .listen(port, function () {
    console.log(chalk.green(`Zet running at ${host}:${port}`))
  })
  .on('error', function (err) {
    if (err.code === 'EADDRINUSE') {
      console.log(chalk.bold.red(`${port} port is already in use`))
    }
  })
