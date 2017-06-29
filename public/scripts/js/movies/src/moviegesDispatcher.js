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


    $('#agregar').click(function(){
        $('#lineModalLabel').text('Registrar Pelicula');

    })

    $('.editar').click(function(){
        $('#lineModalLabel').text('Editar Pelicula');
        const movieId = $(this).data('id');
        moviegesController.movieToUpdate(movieId, dataModal)
    })

    $("#save-movie #update-movie").click(function(event){
        let movie = getDataForm();
        moviegesController.saveMovie(movie, successAlert, errorAlert)
    })

    // FUNCION PARA LLENAR EL MODAL CON LOS DATOS PARA LA EDICIÓN
    function dataModal(response){
        console.log(response.data);
        $("#nombre").val()
        $("#sinopsis").val()
        $("#actores").val()
        $("#director").val()
        $("#trailer").val()
        $("#duracion").val()
        $("#poster").val()
        $("#idioma").val()
        $("#cinema_id").val()
    }

})
