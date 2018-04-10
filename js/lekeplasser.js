var dataliste="";
window.onload = function(){
  loadData();
};

function loadData() {
    var url = "https://hotell.difi.no/api/json/bergen/lekeplasser?";
    promise = getURL(url);
    promise.then(
	     function(response) {
          dataliste = JSON.parse(response).entries;
          loadFile();
          console.log(sjekkAvstand("Bønesparken", "Apotekerhagen"));
	     }
    ).catch(
	     function(reason) { alert("FEIL: " + reason);}
    );
}

function createElement(element) {
    var rekke = document.createElement("tr");
    rekke.setAttribute("id", element.id);
    rekke.classList.add("lekeplasser");

    // oppretter span-element for id
    var id = document.createElement("td");
    id.classList.add("id");
    id.innerHTML = element.id;
    rekke.appendChild(id);

    // oppretter span-element for navn
    var navn = document.createElement("td");
    navn.classList.add("plassering");
    navn.innerHTML = element.navn;
    rekke.appendChild(navn);

    // oppretter span-element for latitude
    var latitude = document.createElement("td");
    latitude.classList.add("latitude");
    latitude.innerHTML = element.latitude;
    rekke.appendChild(latitude);

    // oppretter span-element for longitude
    var longitude = document.createElement("td");
    longitude.classList.add("longitude");
    longitude.innerHTML = element.longitude;
    rekke.appendChild(longitude);

    return rekke;
};

// Må gå nå men sjekk denne for videre oppgaver :
//https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula



function sjekkAvstand(plass1, plass2){
  var sted1 = "";
  var sted2 = "";
  if(dataliste.includes(plass1)){
    sted1 = plass1;
  }
  if(dataliste.includes(plass2)){
    sted2 = plass2;
  }

  var lat1 = sted1.latitude;
  var lon1 = sted1.longitude;
  var lat2 = sted2.latitude;
  var lon2 = sted2.longitude;

  var radius = 6371;
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1);

  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = radius * c;
  return d;

}

function deg2rad(deg){
  return deg * (Math.PI/180)
}





//nds
