#!/usr/bin/env node

var fs = require('fs')
  , path = require('path')
  , exec = require('child_process').exec
  , stream = require('stream')
  , domain = require('domain')
  // Dependencies
  , es = require('event-stream')
  , request = require('request')
  , glob = require('glob')
  , fstream = require('fstream')
  // Other top level vars
  , opts = { name: process.argv[2], year: 2013 }
  , dir = path.join(process.cwd(), opts.name)
  , d = domain.create()

d.on('error', function (e) {
  if (e.code !== 'EISDIR') console.log(e)
})

if (typeof opts.name !== 'string') {
  throw new Error("Must provide a project name!")
}

exec('git config -l', d.intercept(function (stuff) {
  opts.author = stuff.match(/user\.name=(.+)/)[1] + ' <' + stuff.match(/user\.email=(.+)/)[1] + '>'
  opts.gh_author = stuff.match(/github\.user=(.+)/)[1]

  var dep = path.join(dir, 'public', 'dep')
  var src =  path.join(__dirname, 'plate')
  var template = function (str) {
    return Object.keys(opts).reduce(function (item, key) {
      return item.replace(new RegExp('#{' + key + '}#', 'g'), opts[key])
    }, str)
  }
  glob(path.join(src, '**'), function (e, files) {
    files.forEach(function (file) {
      console.log('Copying over ' + file)
      var replacer = new stream.Transform
      replacer._transform = function (data, enc, cb) {
        cb(null, template(data.toString()))
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

}))

