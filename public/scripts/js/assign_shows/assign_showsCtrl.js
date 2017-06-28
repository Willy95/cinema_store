class assign_showsCtrl {

  static getInfoMovie(callback){
    $.ajax({
      url: '/getInfoMovie',
      type: 'POST',
      dataType: 'JSON'
    })
    .done(function(res) {
      callback(res);
    })
    .fail(function(res) {
      callback(res);
      console.log(res);
    });
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

  static save_show(data, callback){
    $.ajax({
      url: '/save-show',
      type: 'POST',
      dataType: 'JSON',
      data: data
    })
    .done(function(res) {
      callback(res);
    })
    .fail(function(res) {
      callback(res);
    });
  }

}
