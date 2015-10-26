var react = require('react')
var d = require('jsnox')(react)
var { IndexRoute, Route, Router } = require('react-router')

var nav = require('component/nav')
var home = require('component/page-home')

module.exports = main

function main (props) {
  return d(Router, {},
      d(Route, {path: '/', component: nav},
        d(IndexRoute, {component: home})))
}
