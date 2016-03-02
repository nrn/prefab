#!/usr/bin/env node
var cluster = require('cluster')
var cc = require('config-chain')
var argv = require('minimist')(process.argv.slice(2))
var server = require('./server')

var config = cc(
  argv,
  argv.config,
  'config.json',
  cc.find('config.json'),
  cc.env('#{name}#_'),
  {
    p: 3333
  }
)

if (cluster.isMaster) {
  cluster.on('disconnect', function () {
    console.error('disconnect')
    cluster.fork()
  })
  cluster.fork()
} else {
  server(config.store)
}

