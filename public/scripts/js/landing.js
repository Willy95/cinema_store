addEventListener("load", function() {
  setTimeout(hideURLbar, 0);
}, false);

function hideURLbar(){
  window.scrollTo(0,1);
}

$(function(){

  $("body").on('click', '#flexiselDemo1 li img', function() {
    window.location.href = '/pelicula/' + $(this).data('info');
  });

  $.ajax({
    url: '/getMoviesAll',
    type: 'POST',
    dataType: 'JSON'
  })
  .done(function(res) {
    switch (res.status) {
      case 'c200':
        $(".logo p").text((res.data.length > 0) ? res.data[0].cinema_id.nombre : '');
        for (var i = 0; i < res.data.length; i++) {
          $("body").find('.flexiselDemo1').append(`<li><img src="/dist/images/${res.data[i].poster}" data-info="${res.data[i]._id}"/></li>`);
        }
        makeMoviesCarousel();
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

  function makeMoviesCarousel(){
    $("#flexiselDemo1").flexisel({
      visibleItems: 6,
      animationSpeed: 1000,
      autoPlay: true,
      autoPlaySpeed: 3000,
      pauseOnHover: false,
      enableResponsiveBreakpoints: true,
      responsiveBreakpoints: {
        portrait: {
          changePoint:480,
          visibleItems: 2
        },
        landscape: {
          changePoint:640,
          visibleItems: 3
        },
        tablet: {
          changePoint:768,
          visibleItems: 4
        }
      }
    });
  }


});
