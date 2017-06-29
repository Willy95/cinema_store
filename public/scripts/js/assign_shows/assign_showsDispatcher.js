$(function(){

  function makeRoomsList(res){
    $.each(res.data, function(index, obj) {
      $("#rooms").append(`<option value="${obj._id}">${obj.numero}</option>`)
    });
  }

  function drawMovieInfo(res){
    console.log(res);
    assign_showsCtrl.getRoomsByType(res.data.movie.tipo, makeRoomsList);
    $("#name").text(res.data.movie.nombre);
    $("#type").text(res.data.movie.tipo);
    $("#language").text(res.data.movie.idioma);
    $("#duration").text(res.data.movie.duracion);
    $(".img-movie-show").attr('src', `/dist/images/${res.data.movie.poster}`)
    $.each(res.data, function(index, el) {
      console.log(el);
      $(".info-assigment").append(`<div class="assigment-card">
        <label>Día ${el.day}</label>&nbsp;|&nbsp;
        <label>${el.hour} hrs</label>&nbsp;|&nbsp;
        <label>Sala ${el.room_id.numero}</label>
        <label class="assigment-delete" data-date="${el._id}">X</label>
      </div>`);
    });
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
          console.log(res);
        })
      }
    }
  });

  assign_showsCtrl.getInfoMovie(drawMovieInfo);

})
