const io = ws('');
const graph = io.channel('stadistics').connect(console.log);
var chart;

$(function(){

  $.ajax({
    url: '/getStadistics',
    type: 'POST',
    dataType: 'JSON'
  })
  .done(function(res) {
    let cat = [];
    let ser = [];
    $.each(res.data, function(s, show) {
      let newMovie = true;
      $.each(cat, function(m, movie) {
        if (show.show.movie_id.nombre == movie){ newMovie = false; }
      });
      if (newMovie){ cat.push(show.show.movie_id.nombre); }
    });
    $.each(cat, function(c, category) {
      let counter = 0;
      $.each(res.data, function(m, movie) {
        if (movie.show.movie_id.nombre == category){ counter++; }
      });
      ser.push(counter);
    });
    chart = Highcharts.chart('container', {
      title: { text: '' },
      xAxis: { categories: cat },
      series: [{
        type: 'column',
        colorByPoint: true,
        data: ser,
        showInLegend: false
      }]
    });
  })
  .fail(function(res) {
    console.log(res);
  });

  // Socket escuchando cambios
  graph.on('onNewsale', function(res){
    $.ajax({
      url: '/getStadistics',
      type: 'POST',
      dataType: 'JSON'
    })
    .done(function(res) {
      let cat = [];
      let ser = [];
      $.each(res.data, function(s, show) {
        let newMovie = true;
        $.each(cat, function(m, movie) {
          if (show.show.movie_id.nombre == movie){ newMovie = false; }
        });
        if (newMovie){ cat.push(show.show.movie_id.nombre); }
      });
      $.each(cat, function(c, category) {
        let counter = 0;
        $.each(res.data, function(m, movie) {
          if (movie.show.movie_id.nombre == category){ counter++; }
        });
        ser.push(counter);
      });
      chart.update({
        xAxis: { categories: cat },
        series: [{
          type: 'column',
          colorByPoint: true,
          data: ser,
          showInLegend: false
        }]
      });
    })
    .fail(function(res) {
      console.log(res);
    });
  });

});
