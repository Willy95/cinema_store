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
