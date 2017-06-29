const io = ws('');
const saleIo = io.channel('stadistics').connect(console.log);

var information;
var showSelected;
var sites_selected = [];

$(function(){

  salesCtrl.getInfoRoom(getMovieInfo);

  saleIo.on('onSetsiteelected', drawSitePreselectedOut);

  function drawSitePreselectedOut(res){
    console.log(res);
    if (res.flag == 'buy'){
      if (res.data.show._id == showSelected._id){
        for (var i = 0; i < res.data.sites.length; i++) {
          $("body").find('#' + res.data.sites[i]).removeClass('siteSelectedOut');
          $("body").find('#' + res.data.sites[i]).removeClass('site');
          $("body").find('#' + res.data.sites[i]).addClass('nonsite');
        }
      }
    }
    else{
      if (res.show._id == showSelected._id){
        if (res.flag == 'assign'){
          $("body").find("#" + res.site).removeClass('site');
          $("body").find("#" + res.site).addClass('siteSelectedOut');
        }
        if (res.flag == 'unassign'){
          $("body").find("#" + res.site).removeClass('siteSelectedOut');
          $("body").find("#" + res.site).addClass('site');
        }
      }
    }
  }

  function getMovieInfo(res){
    information = res;
    printDates(information);
  }

  function printDates(res){
    $.each(res.data.shows, function(index, show) {
      $("#date-select").append(
        `<option value="${show._id}"">
          ${"Fecha " + show.day + " | " + show.hour + " Hrs | Sala " + show.room_id.numero}
        </option>`
      );
    });
    $('#date-select').trigger('change');
  }

  function printSites(res){
    $("#container center").empty();
    showSelected = res.data.show;
    sites_selected= [];
    for (var i = 0; i < res.data.show.room_id.cant_asientos; i++) {
      $("#container center").append(
        `<div id="${i+1}" class="site">${i+1}</div>`
      );
    }
    $.each(res.data.sales, function(index, el) {
      $("body").find('#' + el.site_num).removeClass('site');
      $("body").find('#' + el.site_num).addClass('nonsite');
    });
  }

  function buySites(res){
    console.log(res);
    if (res.status == 'c200'){
      window.location.href = "/";
      saleIo.emit('newsale', 'c200');
      saleIo.emit('setsiteelected', {data: res.data, flag: 'buy'});
    }
  }

  $("body").on('change', '#date-select', function() {
    salesCtrl.getSalesInfo($(this).val(), printSites);
  });

  $("body").on('click', '.site', function(e) {
    $(this).removeClass('site');
    $(this).addClass('site-pre');
    sites_selected.push($(this).attr('id'));
    saleIo.emit('setsiteelected', {show: showSelected, site: $(this).attr('id'), flag: 'assign'});
  });

  $("body").on('click', '.site-pre', function(e) {
    $(this).removeClass('site-pre');
    $(this).addClass('site');
    for (var i = 0; i < sites_selected.length; i++) {
      if ($(this).attr('id') == sites_selected[i]){
        sites_selected.splice(i, 1);
      }
    }
    saleIo.emit('setsiteelected', {show: showSelected, site: $(this).attr('id'), flag: 'unassign'});
  });

  $("#buy").click(function(e) {
    e.preventDefault();
    if (sites_selected.length > 0){
      salesCtrl.saveBought(sites_selected, showSelected, buySites);
    }
    else {
      toastr.info('Selecciona tus asientos');
    }

  });

});
