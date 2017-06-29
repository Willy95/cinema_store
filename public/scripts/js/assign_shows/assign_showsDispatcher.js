$(function(){

  function makeRoomsList(res){
    $.each(res.data, function(index, obj) {
      $("#rooms").append(`<option value="${obj._id}">${obj.numero}</option>`)
    });
  }

  function drawMovieInfo(res){
    assign_showsCtrl.getRoomsByType(res.data.movie.tipo, makeRoomsList);
    $("#name").text(res.data.movie.nombre);
    $("#type").text(res.data.movie.tipo);
    $("#language").text(res.data.movie.idioma);
    $("#duration").text(res.data.movie.duracion);
    $(".img-movie-show").attr('src', `/dist/images/${res.data.movie.poster}`)
    $.each(res.data.shows, function(index, el) {
      $(".info-assigment").prepend(`<div class="assigment-card" id="${el._id}">
        <label>Día ${el.day}</label>&nbsp;|&nbsp;
        <label>${el.hour} hrs</label>&nbsp;|&nbsp;
        <label>Sala ${el.room_id.numero}</label>
        <label class="assigment-delete" data-date="${el._id}">X</label>
      </div>`);
    });
  }

  function removeShow(res){
    console.log(res);
    switch (res.status) {
      case 'c200':
        toastr.success(res.message);
        $("body").find('#' + res.doc._id).remove();
        break;
      default:
        toastr.error(res.message);
        break;
    }
  }

  $("#save-show").click(function(e) {
    let room = $("#rooms").val();
    let hour = $("#hour").val();
    let date = $("#date").val();
    if (room == null){
      toastr.warning('Selecciona una sala');
    }
    else {
      if (hour == "" || date == ""){
        toastr.warning('Selecciona un día y una fecha');
      }
      else {
        let data = {
          room: room,
          hour: hour,
          date: date
        }
        assign_showsCtrl.save_show(data, function(res){
          switch (res.status) {
            case 'c200':
              toastr.success(res.message);
              $(".info-assigment").prepend(`<div class="assigment-card" id="${res.data._id}">
                <label>Día ${data.date}</label>&nbsp;|&nbsp;
                <label>${data.hour} hrs</label>&nbsp;|&nbsp;
                <label>Sala ${$("#date").text()}</label>
                <label class="assigment-delete" data-date="${res.data._id}">X</label>
              </div>`);
              $("input").val('');
              $("#rooms").val(null);
              break;
            case 'c403':
              toastr.warning(res.message);
              break;
            case 'c500':
              toastr.error(res.message);
              break;
            default:
              toastr.error(res.message);
              break;
          }
          console.log(res);
        })
      }
    }
  });

  $("body").on('click', '.assigment-delete', function() {
    assign_showsCtrl.delet_show($(this).data('date'), removeShow);
  });

  assign_showsCtrl.getInfoMovie(drawMovieInfo);

})
