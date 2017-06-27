$(function(){

  function getDataForm(){
    let obj = {
      name: $("#name").val(),
      email: $("#email").val(),
      number: $("#number").val(),
      password: $("#password").val(),
      cpassword: $("#cpassword").val()
    }
    return obj;
  }

  function saveSuccess(res){
    switch (res.status) {
      case 'c200':
        $("#btn-save").prop('disabled', false);
        $("#btn-save").text('Guardar registro');
        $('input').val('');
        toastr.success("usuario registrado correctamente");
        break;
      case 'c403':
        toastr.warning(res.message + ': ' + res.data);
        break;
      case 'c404':
        toastr.warning(res.message);
        break;
      default:
        toastr.error('Error desconocido, intentalo nuevamente más tarde');
        break;
    }
    console.log(res);
  }

  function saveError(err){
    $("#btn-save").prop('disabled', false);
    $("#btn-save").text('Guardar registro');
    toastr.error('Error desconocido, intentalo nuevamente más tarde');
    console.log(err);
  }

  $("#btn-save").click(function(event) {
    let customer = getDataForm();
    let isnull = false;
    $.each(customer, function(key, val) {
      if (val == ""){ isnull = true; }
    });
    if (!isnull){
      if (customer.password === customer.cpassword){
        $(this).prop('disabled', true);
        $(this).text('Guardando...');
        custregController.saveCustomer(customer, saveSuccess, saveError);
      }
      else {
        toastr.warning("Las contraseñas ingresadas no coinciden");
      }
    }
    else {
      toastr.info("Todos los campos son requeridos");
    }
  });

});
