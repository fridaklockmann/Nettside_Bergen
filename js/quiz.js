function startProgram(){
    console.log("JavaScript-fil 'quiz.js' hører til dette dokumentet");
}

function initMap(){
  var bergen = {lat:60.397076, lng: 5.324383};
  var inside_floyen = {lat:60.3960058, lng: 5.3279695};
  var cafeopera = {lat:60.391823, lng: 5.3176287};
  var garage = {lat:60.3894323, lng: 5.3216622};
  var kvarteret = {lat:60.3897013, lng: 5.3198292};

  var map = new google.maps.Map(document.getElementById('map'), {zoom : 15, center: bergen});

  var marker_inside_floyen = new google.maps.Marker({position: inside_floyen, map:map, title: 'Inside - Fløyen'});
  var marker_cafeopera = new google.maps.Marker({position: cafeopera, map:map, title: 'Cafe Opera'});
  var marker_garage = new google.maps.Marker({position: garage, map:map, title: 'Garage'});
  var marker_kvarteret = new google.maps.Marker({position: kvarteret, map:map, title: 'Kvarteret'});


  var info_inside_floyen = new google.maps.InfoWindow({
    content: '<p>Inside - Fløyen</p>'
  });

  marker_inside_floyen.addListener('click', function() {
    info_inside_floyen.open(map, marker_inside_floyen);
  });

  var info_cafeopera = new google.maps.InfoWindow({
    content: '<p>Café Opera</p>'
  });

  marker_cafeopera.addListener('click', function() {
    info_cafeopera.open(map, marker_cafeopera);
  });

  var info_garage = new google.maps.InfoWindow({
    content: '<p>Garage</p>'
  });

  marker_garage.addListener('click', function() {
    info_garage.open(map, marker_garage);
  });

  var info_kvarteret = new google.maps.InfoWindow({
    content: '<p>Kvarteret</p>'
  });

  marker_kvarteret.addListener('click', function() {
    info_kvarteret.open(map, marker_kvarteret);
  });


}
