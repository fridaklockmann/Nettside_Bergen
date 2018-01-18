function initMap(){
  var bergen = {lat:60.397076, lng: 5.324383};
  var inside_live = {lat:60.391402, lng: 5.3218394};
  var cafeopera = {lat:60.391823, lng: 5.3176287};
  var garage = {lat:60.3894323, lng: 5.3216622};
  var kvarteret = {lat:60.3897013, lng: 5.3198292};

  var map = new google.maps.Map(document.getElementById('map'), {zoom : 15, center: bergen});
  var marker_inside_live = new google.maps.Marker({position: inside_live, map:map});
  var marker_cafeopera = new google.maps.Marker({position: cafeopera, map:map});
  var marker_garage = new google.maps.Marker({position: garage, map:map});
  var marker_kvarteret = new google.maps.Marker({position: kvarteret, map:map});
}
