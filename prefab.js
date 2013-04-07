#!/usr/bin/env node

var fs = require('fs')
  , path = require('path')
  , exec = require('child_process').exec
  , stream = require('stream')
  // Dependencies
  , es = require('event-stream')
  , request = require('request')
  , glob = require('glob')
  , fstream = require('fstream')
  // Other top level vars
  , opts = { name: process.argv[2] }
  , dir = path.join(process.cwd(), opts.name)

if (!opts.name) {
  console.log("Must provide a project name!")
  process.exit()
}

exec('git config -l', function (e, stuff) {
  opts.author = stuff.match(/user\.name=(.+)/)[1] + ' <' + stuff.match(/user\.email=(.+)/)[1] + '>'
  opts.year = 2013

  var dep = path.join(dir, 'public', 'dep')
  var src =  path.join(__dirname, 'plate')
  var template = Object.keys(opts).map(function (key) {
     return new RegExp('#{' + key + '}#', 'g')
  })
  glob(path.join(src, '**'), function (e, files) {
    files.forEach(function (file) {
      console.log('Copying over ' + file)
      var replacer = new stream.Transform
      replacer._transform = function (data, enc, cb) {
        cb(null, template.reduce(function (item, regex) {
          return new Buffer(item.toString().replace(item))
        }, data))
      }
      fstream.Reader(file)
        .pipe(replacer)
        .pipe(fstream.Writer(path.join(dir, path.relative(src, file))))
    })
    ;[ 'http://code.jquery.com/jquery.min.js'
    , 'http://backbonejs.org/backbone-min.js'
    , 'http://hay.github.com/stapes/stapes.min.js'
    , 'http://underscorejs.org/underscore-min.js'
    ].forEach(function (url) {
      var req = request(url)
      req.pipe(fstream.Writer(path.join(dep, url.split('/').pop())))
      req.on('error', function (e) {
        console.log('Could not download ' + url +' because of ' + e)
      })
      req.on('end', function () {
        console.log('Downloaded ' + url)
      })
    })

  })

})

