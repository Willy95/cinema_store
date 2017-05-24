'use strict'
const Validator = use('Validator')
const Cliente = use('App/Model/Cliente')
const View = use('Adonis/Src/View')

class ClienteController {

    getDate (request, response) {
        View.global('fecha',function () {
            return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
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
            required: 'Por favor ingresa todos los datos requeridos'
        }
        const validation = yield Validator.validate(data,rules,messages)

        if (validation.fails()) {
            let res = validation.messages()[0].message
            return response.json(res) // verificar la respuesta para mostrarla en una alerta y no en vista
        } else {
            let cliente = new Cliente()
            cliente.nombre  = data.nombre
            cliente.fecha   = data.fecha
            cliente.asiento = data.asiento
            cliente.destino = data.destino
            yield cliente.save()

            return response.json({
                status: "200",
                message: "Exito!",
                data: cliente
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
