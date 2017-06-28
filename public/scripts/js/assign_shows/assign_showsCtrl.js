class assign_showsCtrl {

  static getInfoMovie(){

  }

  static getRoomsByType(type, callback){
    $.ajax({
      url: '/getRoomsByType',
      type: 'POST',
      data: {type: type}
    })
    .done(function(res) {
      callback(res);
    })
    .fail(function(res) {
      callback(res);
    });
  }

}
