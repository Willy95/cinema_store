'use strict'

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const Show = use('App/Model/Mongo/ShowMongo')
const Room = use('App/Model/Mongo/RoomMongo')
const Sale = use('App/Model/Mongo/SaleMongo')
const Customer = use('App/Model/Mongo/CustomerMongo')

class SalesController {

  * sendViewToBuy(req, res){
    return yield res.sendView('sales')
  }

  * getSalesInfo(req, res){
    let showId = req.all().show_id
    console.log(showId)
    Show.findOne({'_id': showId}, (err, info) => {
      Room.populate(info, {path: 'room_id'}, (err, info) => {
        Sale.find({'show': showId}, (errSale, sales) => {
          return res.send({
            status: 'c200',
            data: {
              show: info,
              sales: sales
            }
          })
        })
      })
    })
  }

  * saveBought(req, res){
    let data = req.all()
    let user = req.auth.user.attributes.id
    Customer.findOne({'user': user}, (err, client) => {
      if (err){
        return res.send({
          status: 'c500',
          message: 'Error en el servidor de base de datos',
          data: err
        })
      }
      else {
        for (var i = 0; i < data.sites.length; i++) {
          let sale = new Sale()
          sale.show = data.show._id
          sale.customer = client._id
          sale.site_num = data.sites[i]
          sale.save()
        }
        return res.send({
          status: 'c200',
          message: 'Success',
          data: data
        })
      }
    })
  }

}

module.exports = SalesController
