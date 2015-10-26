var react = require('react')
var d = require('jsnox')(react)

module.exports = home

function home (props) {
  return d('div.home', {}, 'Hello World!')
}

