require('es6-promise').polyfill()
require('whatwg-fetch')

global.log = log

function log (a) {
  console.log(a)
  return a
}

