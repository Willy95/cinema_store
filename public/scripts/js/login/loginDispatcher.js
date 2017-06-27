$(function(){

  function getData(){
    let data = {
      email: $("#email").val(),
      password: $("#password").val()
    }
    return data;
  }

  function response(res){
    switch (res.type) {
      case 'success':
        toastr.success(res.message);
        window.location.href = "/";
        break;
      case 'info':
        toastr.info(res.message);
        $("#btn-login").prop('disabled', false);
        $("#btn-login").text('Iniciar Sesión');
        break;
      case 'warning':
        toastr.warning(res.message);
        $("#btn-login").prop('disabled', false);
        $("#btn-login").text('Iniciar Sesión');
        break;
      case 'error':
        toastr.error(res.message);
        $("#btn-login").prop('disabled', false);
        $("#btn-login").text('Iniciar Sesión');
        break;
      default:
        toastr.warning("Respuesta no identificada, intentalo nuevamente");
        $("#btn-login").prop('disabled', false);
        $("#btn-login").text('Iniciar Sesión');
        break;
    }
  }

  $("#btn-login").click(function(e) {
    $(this).prop('disabled', true);
    $(this).text('Verificando...');
    loginCtrl.login(getData(), response);
  });

});
