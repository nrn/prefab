// server.js
var http = require('http')
  , ecstatic = require('ecstatic')
  , ramrod = require('ramrod')

module.exports = server

function server (opts) {
  var routes = {}
    , router = ramrod(routes)
    , app = http.createServer(router.dispatch.bind(router))

  router.on('*', ecstatic(__dirname + '/public'))

  app.listen(opts.p, function (e) {
    if (e) throw e
    console.log('Listening on: ' + opts.p)
  })

  return app
}
