var fs = require('fs')
  , path = require('path')
  , exec = require('child_process').exec
  // Dependencies
  , es = require('event-stream')
  , request = require('request')
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
  var dirs =
    [ dir
    , path.join(dir, 't')
    , path.join(dir, 'bin')
    , path.join(dir, 'public')
    , dep
    ]

  mkdirs(dirs, function (e) {
    if (e) throw e

    // Download common dependencies
    ;[ 'http://code.jquery.com/jquery.min.js'
    , 'http://backbonejs.org/backbone-min.js'
    , 'http://hay.github.com/stapes/stapes.min.js'
    , 'http://underscorejs.org/underscore-min.js'
    ].forEach(function (url) {
      var req = request(url)
      req.pipe(fs.createWriteStream(path.join(dep, url.split('/').pop())))
      req.on('error', function (e) {
        console.log('Could not download ' + url +' because of ' + e)
      })
      req.on('end', function () {
        console.log('Downloaded ' + url)
      })
    })


    ;[ 'package.json'
    , 'readme.md'
    , 'LICENSE'
    , 'server.js'
    , '.gitignore'
    , 'bin/cli.js'
    ].forEach(function (file) {
      console.log('Copying over ' + file)
      fs.createReadStream(path.join(__dirname, 'plate', file))
        .pipe(replacer(opts))
        .pipe(fs.createWriteStream(path.join(dir, file)))
    })
  })

  function mkdirs (dirs, cb) {
    if (!dirs.length >= 1) return cb(null)
    fs.mkdir(dirs.shift(), function (e) {
      if (e) return cb(e)
      mkdirs(dirs, cb)
    })
  }
})

function replacer (opts) {
  return es.map(function (data, cb) {
    cb(null, Object.keys(opts).reduce(function (d, key) {
      return d.replace(new RegExp('#{' + key + '}#', 'g'), opts[key])
    }, data.toString()))
  })
}

