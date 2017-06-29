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
                window.location.reload();
                break;
            case 'c403':
                toastr.warning(res.msj)
                break;
            default:
                toastr.error('Error desconocido, intentalo nuevamente más tarde');

        }

    }

    function errorAlert(err) {
        toastr.error(err)
        console.log(err);
    }


    $('#agregar').click(function(){
        $('#lineModalLabel').text('Registrar Pelicula');
        $('.edit-input').hide();
        $('.save-input').show();
        $('#posterName').text('');
        $("#nombre").val('');
        $("#sinopsis").val('');
        $("#actores").val('');
        $("#director").val('');
        $("#trailer").val('');
        $("#duracion").val('');
        $("#poster").val('');
        $("#idioma").val('');
        $('#cinema_id option[value="0"]').attr("selected",true);
        $('#cinema_id option').each(function(){
            if ($('#cinema_id option[value='+ this.value +']') != 0) {
                $('#cinema_id option[value='+ this.value +']').attr("selected",false);
            }

        })

        $('#save-movie').show();
        $('#update-movie').hide();

    })

    $('.edit-input').hide();

    $('.editar').click(function(){
        $('#cinema_id option').each(function(){
            if ($('#cinema_id option[value='+ this.value +']') != 0) {
                $('#cinema_id option[value='+ this.value +']').attr("selected",false);
            }
        })
        $('#lineModalLabel').text('Editar Pelicula');
        $('.save-input').hide();
        $('.edit-input').show();

        $('#update-movie').show();
        $('#save-movie').hide();
        const movieId = $(this).data('id');
        moviegesController.movieToUpdate(movieId, dataModal)
    })

    $("#save-movie").click(function(event){
        // let movie = getDataForm();
        // moviegesController.saveMovie(movie, successAlert, errorAlert)
        let formData = new FormData($("#registerMovieForm-poster")[0]);
        formData.append('nombre', $("#nombre").val());
        formData.append('sinopsis', $("#sinopsis").val());
        formData.append('actores', $("#actores").val());
        formData.append('director', $("#director").val());
        formData.append('trailer', $("#trailer").val());
        formData.append('duracion', $("#duracion").val());
        formData.append('idioma', $("#idioma").val());
        formData.append('cinema_id', $("#cinema_id").val());
        formData.append('tipo', $("#tipo").val());
        moviegesController.saveMovie(formData, successAlert, errorAlert)
    })

    $("#update-movie").click(function(event){
        let movie = getDataForm();
        moviegesController.updateMovie(movie, successAlert, errorAlert)
    })

    $(".desactivar").click(function(event){
        const id = $(this).data('id')
        moviegesController.deleteMovie(id, function(response){
            if (response.status == 200) {
                window.location = '/management-movie';
            }
        })
    })


    // FUNCION PARA LLENAR EL MODAL CON LOS DATOS PARA LA EDICIÓN
    function dataModal(response){
        $('#posterName').text(response.data.poster);
        $("#nombre").val(response.data.nombre);
        $("#sinopsis").val(response.data.sinopsis);
        $("#actores").val(response.data.actores);
        $("#director").val(response.data.director);
        $("#trailer").val(response.data.trailer);
        $("#duracion").val(response.data.duracion);
        // $("#poster").val(response.data.poster)
        $("#idioma").val(response.data.idioma);
        $('#cinema_id > option[value ='+ response.data.cinema_id._id +']').attr('selected',true);

    }

})
