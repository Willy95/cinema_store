$(function(){

    //**************************************************************//
    // REGISTRO
    function getFormRegister(){
        var data = {
            nicknameReg: $('#nicknameReg').val(),
            passwordReg: $('#passwordReg').val()
        }

        return data;
    }

    $('#save').click(function(e){
        e.preventDefault();
        $.ajax({
            url: $('#registerUserForm').attr('action'),
            type: $('#registerUserForm').attr('method'),
            dataType: 'JSON',
            data: getFormRegister()
        }).done(function(response){
            alert(response.res)
            $('#nicknameReg').val('')
            $('#passwordReg').val('')
        }).fail(function(){})
    });

    $("#registerUserForm").on('submit', function(event) {
        event.preventDefault();
        $('#save').trigger('click');
    });

    //**************************************************************//
    // LOGIN
    function getFormLogin(){
        var data = {
            nickname: $('#nickname').val(),
            password: $('#password').val()
        }

        return data;
    }

    $('#logIn').click(function(){
        $.ajax({
            url: $('#loginForm').attr('action'),
            type: $('#loginForm').attr('method'),
            dataType: 'JSON',
            data: getFormLogin()
        }).done(function(response){
            if (response.res == "success"){
                document.location.href = "/chat";
            }
            else{
                alert(response.res);
                $('#nickname').val('');
                $('#password').val('');
            }
        }).fail(function(e){
            alert("Error inesperado");
            console.log(e);
        })
    })
})
