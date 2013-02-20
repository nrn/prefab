var test = require('tape')
  , server = require('../../server.js')

var serv1 = server({ p: 8080})
test('server.js', function (t) {
  t.plan(1)
  t.ok(serv1, 'tests load')
}).on('end', function () {
  serv1.close()
})