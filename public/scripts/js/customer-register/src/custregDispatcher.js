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
        alert("usuario registrado correctamente");
        break;
      case 'c403':
        alert(res.message + ': ' + res.data);
        break;
      case 'c404':
        alert(res.message);
        break;
      default:
        alert('Error desconocido');
        break;
    }
    console.log(res);
  }

  function saveError(err){
    $("#btn-save").prop('disabled', false);
    $("#btn-save").text('Guardar registro');
    alert("error");
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
        alert("Las contraseñas ingresadas no coinciden");
      }
    }
    else {
      alert("Todos los campos son requeridos");
    }
  });

});
