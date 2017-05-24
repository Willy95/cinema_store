'use strict'
const Validator = use('Validator')
const Cliente = use('App/Model/Cliente')
const View = use('Adonis/Src/View')

class ClienteController {

    getDate (request, response) {
        View.global('fecha',function () {
            return `${new Date().getFullYear()} / ${new Date().getMonth() + 1} / ${new Date().getDate()}`
        })

        return response.sendView('buy_ticket')

    }

    * register (request, response) {
        const data = request.only('fecha','nombre','asiento','destino')
        const rules = {
            fecha: 'required',
            nombre: 'required',
            asiento: 'required',
            destino: 'required'
        }
        const messages = {
            required: 'No seas gacho llena todos los campos'
        }
        const validation = yield Validator.validate(data,rules,messages)

        if (validation.fails()) {
            let res = validation.messages()[0].message
            return response.json(res) // verificar la respuesta para mostrarla en una alerta y no en vista
        } else {
            Cliente.create(data)
            return response.json({
                status: "200",
                message: "Exito!",
                data: data
            })
        }
    }


    * assigned(req, res){
        return res.send({
            status: "200",
            data: yield Cliente.all()
        });
    }

}

module.exports = ClienteController
