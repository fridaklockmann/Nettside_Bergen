var dataliste = "";

window.onload = function(){
  loadData();
  hamburger();
}

var rbliste = "";

function loadData() {
  var url = "https://hotell.difi.no/api/json/bergen/lekeplasser?";
  promise = getURL(url);
  promise.then(
	    function(response) {
        dataliste = JSON.parse(response).entries;
        loadFile();
        document.getElementById("regnUtAvstand").addEventListener('click', regnUtAvstand);
	    }
  ).catch(
	    function(reason) {
        alert("FEIL: " + reason);
      }
  );
}

function createElement(element) {
    var rekke = document.createElement("tr");
    rekke.setAttribute("id", element.id);
    rekke.classList.add("lekeplasser");

    // Oppretter span-element for id
    var id = document.createElement("td");
    id.innerHTML = element.id;
    rekke.appendChild(id);

    // Oppretter span-element for navn
    var navn = document.createElement("td");
    navn.innerHTML = element.navn;
    rekke.appendChild(navn);

    // Oppretter span-element for latitude
    var latitude = document.createElement("td");
    latitude.innerHTML = element.latitude;
    latitude.classList.add("fjerneMobil");
    rekke.appendChild(latitude);

    // Oppretter span-element for longitude
    var longitude = document.createElement("td");
    longitude.innerHTML = element.longitude;
    longitude.classList.add("fjerneMobil");
    rekke.appendChild(longitude);

    return rekke;
};

function regnUtAvstand(){
  var a = document.getElementById("plass1").value;
  var b = document.getElementById("plass2").value;
  var tallMellomEnOgHundre= /^[1-9][0-9]?$|^100$/;
  var bokstaver = /[a-zA-Z]/;

  if(a == "" || b == ""){
    alert("Skriv inn gyldig lekeplassnavn eller id");
  }
  else {
    if(a.match(tallMellomEnOgHundre)){
      a = dataliste[a-1];
    }
    else if(a.match(bokstaver)){
      for(var i = 0; i < dataliste.length; i++){
        if(dataliste[i].navn.includes(a)){
          a = dataliste[i];
        }
      }
      if(a.navn == undefined){
        document.getElementById("avstanden").innerHTML = "Kjenner ikke til lekeplassen med navn/id: " + a + ".";
      }
    }

    if(b.match(tallMellomEnOgHundre)){
      b = dataliste[b-1];
    }
    else if(b.match(bokstaver)){
      for(var i = 0; i < dataliste.length; i++){
        if(dataliste[i].navn.includes(b)){
          b = dataliste[i];
        }
      }
      if(b.navn == undefined){
        document.getElementById("avstanden").innerHTML += "<br>" + "Kjenner ikke til lekeplassen med navn/id: " + b + ".";
      }
    }
    if(a.navn != undefined && b.navn != undefined){
      document.getElementById("avstanden").innerHTML = "Avstanden mellom lekeplassene " + a.navn + " og " + b.navn + " er " + sjekkAvstand(a, b) + " km";
    }
  }
}
