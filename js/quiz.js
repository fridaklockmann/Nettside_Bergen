function initMap(){
  var bergen = {lat:60.397076, lng: 5.324383};
  var map = new google.maps.Map(document.getElementById('map'), {zoom : 4, center: bergen});
  var marker = new google.maps.Marker({position: bergen, map:map});

}
