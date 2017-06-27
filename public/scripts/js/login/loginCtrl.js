class loginCtrl {

  static login(data, callback){
    var response = {type:null, message:null};
    $.ajax({
      url: '/login',
      type: 'POST',
      data: { data }
    })
    .done(function(res) {
      switch (res.status) {
        case 'c200':
          response.type = 'success';
          response.message = res.message;
          break;
        case 'c404':
          response.type = 'info';
          response.message = res.message;
          break;
        case 'c403':
          response.type = 'warning';
          response.message = res.message;
          break;
        default:
          console.log(res);
          response.type = 'error';
          response.message = 'Error desconocido, intentalo nuevamente más tarde';
          break;
      }
      callback(response);
    })
    .fail(function(res) {
      console.log(res);
      response.type = 'error';
      response.message = 'Error desconocido, intentalo nuevamente más tarde';
      callback(response);
    });
  }

}
