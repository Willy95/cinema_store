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
        $('#')
        const movieId = $(this).data('id');
        moviegesController.movieToUpdate(movieId, dataModal)
    })

    $("#save-movie #update-movie").click(function(event){
        let movie = getDataForm();
        moviegesController.saveMovie(movie, successAlert, errorAlert)
    })

    // FUNCION PARA LLENAR EL MODAL CON LOS DATOS PARA LA EDICIÓN
    function dataModal(response){
        // console.log(response.data[0]);
        $("#nombre").val(response.data[0].nombre)
        $("#sinopsis").val(response.data[0].sinopsis)
        $("#actores").val(response.data[0].actores)
        $("#director").val(response.data[0].director)
        $("#trailer").val(response.data[0].trailer)
        $("#duracion").val(response.data[0].duracion)
        $("#poster").val(response.data[0].poster)
        $("#idioma").val(response.data[0].idioma)
        $("#cinema_id").val(response.data[0].cinema_id.nombre)
    }

})
