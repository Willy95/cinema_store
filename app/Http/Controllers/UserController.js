'use strict'
const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')
const Database = use('Database')

class UserController {

    * registerView (request, response) {
        return yield response.sendView('registerUser')
    }

    * register (request, response) {
        const data = request.only('nicknameReg','passwordReg','cpasswordReg')
        const rules = {
            nicknameReg:  'required',
            passwordReg:  'required',
            cpasswordReg: 'required'
        }
        const messages = {
            required: 'Llena todos los campos'
        }
        const validation = yield Validator.validate(data,rules,messages)
        if (validation.fails()) {
            let res = validation.messages()[0].message
            return response.json({
                res: res
            })
        } else {
            if (data.passwordReg != data.cpasswordReg) {
                return response.json({
                    res: 'Las passwords no coinciden'
                })
            }else {
                let ext = ['.jpg', '.png'];
                let user = new User()
                user.nickname = data.nicknameReg
                user.password = yield Hash.make(data.passwordReg)
                user.active   = 1
                // console.log(ext);
                // console.log(Math.floor((Math.random() * 2) + 1));
                user.image    = "avatar" + Math.floor((Math.random() * 5) + 1) + ext[Math.floor((Math.random() * 2) + 1) - 1]
                yield user.save()
                return response.json({
                    res: 'Guardado exitosamente'
                })
            }
        }
    }

    * loginView (request, response) {
        return yield response.sendView('login')
    }

    * auth (request, response) {
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
            return response.json({
                res: res
            })
        } else {
            try {
                const login = yield request.auth.attempt(data.nickname,data.password)
                if (login) {
                    return yield response.json({
                        res: 'success'
                    })
                }
            } catch (err) {
                return response.json({
                    res: 'Credenciales no validas'
                })
            }
        }
    }

    * logOut (request, response) {
        yield request.auth.logout()
        return response.redirect('/')
    }

}

module.exports = UserController
