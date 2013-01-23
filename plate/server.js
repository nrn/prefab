// server.js
var http = require('http')
  // dependencies
  , f = require('flates')
  , ecstatic = require('ecstatic')
  , ramrod = require('ramrod')
  , browserify = require('browserify')

module.exports = server

function server (opts) {
  var routes = 
      { '': null
      , 'client.js': null
      }
    , router = ramrod(routes)
    , app = http.createServer(router.dispatch.bind(router))
    , b = browserify({ watch: true, debug: true, exports: ['require', 'process']})

  b.addEntry(__dirname + '/public/client.js')

  router.on('', function (req, res) {
    res.statusCode = 200
    var scripts =
      [ '/dep/jquery.min.js'
      , '/client.js'
      ]
    res.write(f.d() + scripts.map(function (script) {
      return f.script({ src: script })
    }).join(''))
    res.end()
  })

  router.on('client.js', function (req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/javascript')
    res.write(b.bundle())
    res.end()
  })

  router.on('*', ecstatic(__dirname + '/public'))

  app.listen(opts.p, function (e) {
    if (e) throw e
    console.log('Listening on: ' + opts.p)
  })

  return app
}
