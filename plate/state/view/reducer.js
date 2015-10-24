var createReducer = require('create-reducer')
var reduce = require('universal-reduce')

module.exports = {
  reducer: createReducer({
    url
  }, init)
}

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
