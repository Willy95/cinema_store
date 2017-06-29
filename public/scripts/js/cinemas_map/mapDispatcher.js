// $(document).on('ready',__init);

$(document).ready(function(){

    var map;
    var marker;
    var windows;


    var map;

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 25.5428, lng: -103.4068},
          zoom: 8,
          mapTypeControl: false
        });
    }initMap();

})
