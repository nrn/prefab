var fs = require('fs')
  , path = require('path')
  , exec = require('child_process').exec
  // Dependencies
  , es = require('event-stream')

exec('git config -l', function (e, stuff) {
  var opts =
    { author: stuff.match(/user\.name=(.+)/)[1] + ' <' + stuff.match(/user\.email=(.+)/)[1] + '>'
    , name: process.argv[2]
    , year: 2013
    }
  , dir = path.join(process.cwd(), opts.name)

  if (!opts.name) {
    console.log("Must provide a project name!")
    process.exit()
  }

  fs.mkdir(dir, function (e) {
    if (e) throw e

    ;[ 'package.json'
    , 'LICENSE'
    ].forEach(function (file) {
      fs.createReadStream(path.join(__dirname, 'plate', file))
        .pipe(replacer(opts))
        .pipe(fs.createWriteStream(path.join(dir, file)))
    })
  })
})

function replacer (opts) {
  return es.map(function (data, cb) {
    cb(null, Object.keys(opts).reduce(function (d, key) {
      return d.replace(new RegExp('#{' + key + '}#', 'g'), opts[key])
    }, data.toString()))
  })
}

