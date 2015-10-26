var react = require('react')
var d = require('jsnox')(react)

module.exports = nav

function nav (props) {
  return d(
    'div.nav',
    d('span', 'navigation'),
    d('div.main', props.children)
  )
}
