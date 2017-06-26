class custregController {

  constructor() {
  }

  static saveCustomer(data, success, error){
    $.ajax({
      url: '/save-customer',
      type: 'post',
      data: { data }
    })
    .done(function(res) {
      success(res);
    })
    .fail(function(err) {
      error(err);
    });
  }

}
