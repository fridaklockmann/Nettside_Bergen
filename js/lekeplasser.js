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
	     }
    ).catch(
	     function(reason) { alert("FEIL: " + reason);}
    );
}
function createElement(element) {
    var rekke = document.createElement("tr");
    rekke.setAttribute("id", element.id);
    rekke.classList.add("toalett");

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
