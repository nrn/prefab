var { createStore, combineReducers, applyMiddleware } = require('redux')
var thunk = require('redux-thunk')
var view = require('./view/reducer')

module.exports = applyMiddleware(thunk)(createStore)(combineReducers({ view }))

