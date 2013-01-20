#!/usr/local/bin/node
var cc = require('config-chain')
  , argv = require('optimist').argv
  , server = require('../server')

var config = cc( argv
  , argv.config
  , cc.find('config.json')
  , cc.env('#{name}#_')
  , { p: 3333
    }
  )

server(config.store)

