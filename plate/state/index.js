var { createStore, combineReducers, applyMiddleware } = require('redux')
var thunk = require('redux-thunk')
var view = require('./view/reducer.js')

module.exports = applyMiddleware(thunk)(createStore)(combineReducers({ view }))
