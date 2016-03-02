var react = require('react')
var d = require('jsnox')(react)
var { render } = require('react-dom')
var domready = require('domready')
var { Provider } = require('react-redux')

var router = require('./component/router')
var store = require('./action/store')

domready(start)

function start () {
  render(
    d(Provider, { store }, d(router)),
    document.getElementById('app')
  )
}

