'use strict'

const Cliente = exports = module.exports = {}

Cliente.methodName = function * (next) {
  // {this} belongs to model instance
  yield next
}
