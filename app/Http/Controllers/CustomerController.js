'use strict'

const Validator = use('Validator')
const Database = use('Database')
const mongoose = use('mongoose')
const User = use('App/Model/User')
const Hash = use('Hash')
const CustomerMongo = use('App/Model/Mongo/CustomerMongo')

class CustomerController {

  * renderPage(req, res){
    return yield res.sendView('customer_reg')
  }

  * save(req, res){
    try {
      let data = req.all().data
      const rules = {
        email:  'required',
        password:  'required',
        cpassword: 'required',
        name: 'required'
      }
      const messages = {
        required: 'Llena todos los campos'
      }
      const validation = yield Validator.validate(data, rules, messages)
      if (validation.fails()) {
        let res = validation.messages()[0].message
        return response.json({
          status: 'c403',
          message: 'Falló la validación',
          data: res
        })
      } else {
        if (data.passwordReg != data.cpasswordReg) {
          return response.json({
            status: 'c404',
            message: 'Las passwords no coinciden'
          })
        }else {
          let emailStored = yield Database.from('users').where({ 'email': data.email }).limit(1)
          if (emailStored.length > 0){
            return res.json({
              status: 'c404',
              message: 'El usuario ingresado ya existe, intenta con otro'
            })
          }
          else {
            var user = new User()
            user.email = data.email
            user.password = yield Hash.make(data.password)
            user.token = yield Hash.make(data.email)
            user.active = 1
            user.role_name = 'customer'
            user.full_name = data.name
            if (yield user.save()){
              let customer = new CustomerMongo();
              customer.user = user.attributes.id
              customer.card = data.number
              customer.save()
              return res.send({
                status: 'c200',
                message: 'Usuario registrado correctamente',
                data: user
              })
            }
            return res.json({
              status: 'c500',
              message: 'Error al registrar al usuario, intentalo nuevamente'
            })
          }
        }
      }
    } catch (e) {
      console.log(e);
      return res.send({
        status: 'c500',
        message: 'server error',
        data: e
      })
    }
  }
}

module.exports = CustomerController
