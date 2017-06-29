$(function(){

    function getDataForm() {
        let data = {
            nombre:   $("#nombre").val(),
            sinopsis: $("#sinopsis").val(),
            actores:  $("#actores").val(),
            director: $("#director").val(),
            trailer:  $("#trailer").val(),
            duracion: $("#duracion").val(),
            poster:   $("#poster").val(),
            idioma:   $("#idioma").val(),
            cinema_id:$("#cinema_id").val()
        }
        return data;
    } // mandar los datos del form como un objeto

    function successAlert(res) {
        switch (res.status) {
            case 'c200':
                toastr.success(res.msj);
                break;
            case 'c403':
                toastr.warning(res.msj)
                break;
            default:
                toastr.error('Error desconocido, intentalo nuevamente más tarde');

        }

    }

    function errorAlert(err) {
        toastr.error(error)
        console.log(err);
    }


    $("#save-movie").click(function(event){
        let movie = getDataForm();
        moviegesController.saveMovie(movie, successAlert, errorAlert)
    })

    $('#agregar').click(function(){
        $('#lineModalLabel').text('Registrar Peliculas');
        console.log("msj");
    })

    $('.editar').click(function(){

    })

})
