#!/usr/local/bin/node
var cluster = require('cluster')
  , cc = require('config-chain')
  , argv = require('optimist').argv
  , server = require('./index')

var config = cc( argv
  , argv.config
  , 'config.json'
  , cc.find('config.json')
  , cc.env('#{name}#_')
  , { p: 3333
    }
  )

if (cluster.isMaster) {
  cluster.on('disconnect', function () {
    console.error('disconnect')
    cluster.fork()
  })

  require('os').cpus().forEach(function () {
    cluster.fork()
  })

} else {

  server(config.store)

}

