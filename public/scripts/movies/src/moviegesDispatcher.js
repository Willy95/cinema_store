$(function(){

    function getDataForm() {
        let data = {
            title:   $("#title").val(),
            poster:  $("#poster").val()
            year:    $("#year").val()
            runtime: $("#runtime").val()
            trailer: $("#trailer").val()
            synopsis:$("#synopsis").val()
        }
        return data;
    } // mandar los datos del form como un objecto

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
        
    })

})
