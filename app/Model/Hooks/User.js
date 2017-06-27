'use strict'

const User = exports = module.exports = {}

User.methodName = function * (next) {
  yield next
}
