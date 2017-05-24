'use strict'

const Cliente = exports = module.exports = {}

Cliente.generateCode = function * (next) {
  const name = this.nombre.substr(0,3)
  const random = Math.floor((Math.random() * 1000) + 1)
  const code = `${name}${random}`
  this.codigo = code
  yield next
}
