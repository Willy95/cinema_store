'use strict'
const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')
const Database = ('Database')

class UserController {

    * registerView (request, response) {
        return yield response.sendView('registerUser')
    }

    * register (request, response) {
        const data = request.only('nickname','password')
        const rules = {
            nickname: 'required',
            password: 'required'
        }
        const messages = {
            required: 'Llena todos los campos'
        }
        const validation = yield Validator.validate(data,rules,messages)
        if (validation.fails()) {
            let res = validation.messages()[0].message
            return response.json(res)
        } else {
            let user = new User()
            user.nickname = data.nickname
            user.password = yield Hash.make(data.password)
            user.active   = 1
            yield user.save()
            return response.json({
                res: 'Guardado exitosamente'
            })
        }
    }

    * loginView (request, response) {
        return yield response.sendView('login')
    }

    * auth (request, response) {

    }

}

module.exports = UserController
