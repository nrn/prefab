var react = require('react')
var d = require('jsnox')(react)
var { IndexRoute, Route, Router } = require('react-router')

var nav = require('./nav')
var home = require('./page-home')

module.exports = main

function main (props) {
  return d(Router, {},
      d(Route, {path: '/', component: nav},
        d(IndexRoute, {component: home})))
}
