var createReducer = require('create-reducer')
var reduce = require('universal-reduce')
var register = require('../index')

var actionHandlers = {
  url,
  windowSize
}

module.exports = createReducer(actionHandlers, init)

Object.keys(actionHandlers).forEach(function (name) { register(name, 'view') })

function url (state, action) {
  return combine(state, { url: action.payload.url })
}

function windowSize (state, action) {
  var { innerHeight, innerWidth } = action.payload
  return combine(state, {innerHeight, innerWidth})
}

function init () {
  return {
    url: '/',
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth
  }
}

function combine () {
  return reduce(arguments, function (all, obj) {
    return reduce(obj, function (all, val, key) {
      all[key] = val
      return all
    }, all)
  }, {})
}

