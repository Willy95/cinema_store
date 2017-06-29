$(function(){

    function getDataForm() {
      let formData = new FormData($("#registerMovieForm-poster")[0]);
      formData.append('nombre', $("#nombre").val());
      formData.append('sinopsis', $("#sinopsis").val());
      formData.append('actores', $("#actores").val());
      formData.append('director', $("#director").val());
      formData.append('trailer', $("#trailer").val());
      formData.append('duracion', $("#duracion").val());
      formData.append('idioma', $("#idioma").val());
      formData.append('cinema_id', $("#cinema_id").val());
        // let data = {
        //     nombre:   $("#nombre").val(),
        //     sinopsis: $("#sinopsis").val(),
        //     actores:  $("#actores").val(),
        //     director: $("#director").val(),
        //     trailer:  $("#trailer").val(),
        //     duracion: $("#duracion").val(),
        //     poster:   $("#poster").val(),
        //     idioma:   $("#idioma").val(),
        //     cinema_id:$("#cinema_id").val()
        // }
        return formData;
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
                break;
        }

    }

    function errorAlert(err) {
        toastr.error(error)
        console.log(err);
    }


    $("#save-movie").click(function(event){
        // $("#registerMovieForm").submit();
        // let movie = getDataForm();
        let formData = new FormData($("#registerMovieForm-poster")[0]);
        formData.append('nombre', $("#nombre").val());
        formData.append('sinopsis', $("#sinopsis").val());
        formData.append('actores', $("#actores").val());
        formData.append('director', $("#director").val());
        formData.append('trailer', $("#trailer").val());
        formData.append('duracion', $("#duracion").val());
        formData.append('idioma', $("#idioma").val());
        formData.append('cinema_id', $("#cinema_id").val());
        console.log(formData);
        moviegesController.saveMovie(formData, successAlert, errorAlert)
    })

    $('#agregar').click(function(){
        $('#lineModalLabel').text('Registrar Peliculas');
        console.log("msj");
    })

    $('.editar').click(function(){

    })

})
