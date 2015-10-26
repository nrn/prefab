var createReducer = require('create-reducer')
var reduce = require('universal-reduce')
var register = require('../index')

var actionHandlers = {
  url
}

module.exports = createReducer(actionHandlers, init)

Object.keys(actionHandlers).forEach(function (name) { register(name, 'view') })

function url (state, action) {
  return combine(state, action.payload)
}

function init () {
  return { url: '/' }
}

function combine () {
  return reduce(arguments, function (all, obj) {
    return reduce(obj, function (all, val, key) {
      all[key] = val
      return all
    }, all)
  }, {})
}

