var fs = require('fs')
  , path = require('path')
  , exec = require('child_process').exec
  // Dependencies
  , es = require('event-stream')


exec('git config -l', function (e, stuff) {
  var opts =
    { author: stuff.match(/user\.name=(.+)/)[1]
    , email: stuff.match(/user\.email=(.+)/)[1]
    , name: process.argv[2]
    }

  if (!opts.name) {
    console.log("Must provide a project name!")
    process.exit()
  }

  fs.createReadStream(path.join(__dirname, 'plate', 'package.json'))
    .pipe(replacer(opts))
    .pipe(fs.createWriteStream(path.join(__dirname, 'tmp.json')))

})

function replacer (opts) {
  return es.map(function (data, cb) {
    cb(null, Object.keys(opts).reduce(function (d, key) {
      return d.replace(new RegExp('#{' + key + '}#', 'g'), opts[key])
    }, data.toString()))
  })
}

