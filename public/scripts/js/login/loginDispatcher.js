$(function(){

  function getData(){
    let data = {
      email: $("#email").val(),
      password: $("#password").val()
    }
    return data;
  }

  function response(res){
    alert(res.message);
    console.log(res);
    // alert("Estas logueado");
  }

  function error(res){
    console.log(res);
    alert("Error de logueo");
  }

  $("#btn-login").click(function(e) {
    loginCtrl.login(getData(), response);
  });

});
