$(function(){

  function makeRoomsList(res){
    $.each(res.data, function(index, obj) {
      $("#rooms").append(`<option value="${obj.id}">${obj.numero}</option>`)
    });
  }

  assign_showsCtrl.getRoomsByType('3D', makeRoomsList);

})
