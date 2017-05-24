'use strict'
const Validator = use('Validator')
//const Cliente = use('App/Model/Cliente')
const View = use('Adonis/Src/View')

class ClienteController {

    getDate (request, response) {
        View.global('fecha',function () {
            return `${new Date().getFullYear()} / ${new Date().getMonth() + 1} / ${new Date().getDate()}`
        })

        return response.sendView('buy_ticket')

    }

    * register () {

    }

}

module.exports = ClienteController
