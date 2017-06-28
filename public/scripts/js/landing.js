$(function(){

  $("body").on('click', '#flexiselDemo1 li img', function() {
    window.location.href = '/pelicula';
  });

  $.ajax({
    url: '/getMoviesAll',
    type: 'POST',
    dataType: 'JSON'
  })
  .done(function(res) {
    console.log(res);
    switch (res.status) {
      case 'c200':
        toastr.success(res.message);
        break;
      case 'c404':
        toastr.warning(res.message);
        break;
      case 'c500':
        toastr.error(res.message);
        break;
      default:
        toastr.error('Error desconocido, Intentalo nuevamente');
        console.log(res);
        break;
    }
  })
  .fail(function(res) {
    toastr.error('Error desconocido, Intentalo nuevamente');
    console.log(res);
  });


});
