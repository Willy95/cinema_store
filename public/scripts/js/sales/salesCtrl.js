class salesCtrl {

  constructor() {}

  static getInfoRoom(callback){
    $.ajax({
      url: '/pelicula-info',
      type: 'POST',
      dataType: 'JSON'
    })
    .done(function(res) {
      callback(res);
    })
    .fail(function(res) {
      console.log(res);
      callback(res);
    });
  }

  static getSalesInfo(id, callback){
    $.ajax({
      url: '/getSalesInfo',
      type: 'POST',
      dataType: 'JSON',
      data: {show_id: id}
    })
    .done(function(res) {
      callback(res);
    })
    .fail(function(res) {
      console.log(res);
      callback(res);
    });
  }

  static saveBought(sites, show, callback){
    $.ajax({
      url: '/saveBought',
      type: 'POST',
      dataType: 'JSON',
      data: {
        sites: sites,
        show: show
      }
    })
    .done(function(res) {
      callback(res);
    })
    .fail(function(res) {
      console.log(res);
      callback(res);
    });
  }

}
