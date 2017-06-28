'use strict'

const RoomMongo = use('App/Model/Mongo/RoomMongo')

class RoomController {

  * getRoomsByType(req, res){
    let type = req.all().type
    RoomMongo.find({'tipo': type}, (err, obj) => {
      if (err){
        return res.send({
          status: "c500",
          message: "Ha ocurrido un error",
          data: err
        });
      }
      else {
        if (!obj){
          return res.send({
            status: "c404",
            message: "No se han encontrado coincidencias",
            data: null
          });
        }
        else {
          return res.send({
            status: "c200",
            message: "Consulta completa correctamente",
            data: obj
          });
        }
      }
    })
  }

}

module.exports = RoomController
