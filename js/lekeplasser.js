var dataliste="";

window.onload = function(){
  loadData();
  hamburger();
}
var rbliste="";

function loadData() {
    var url = "https://hotell.difi.no/api/json/bergen/lekeplasser?";
    promise = getURL(url);
    promise.then(
	     function(response) {
          dataliste = JSON.parse(response).entries;
          loadFile();
          document.getElementById("regnUtAvstand").addEventListener('click', regnUtAvstand);
          var radiobuttons = document.getElementsByClassName("rbutton");
          rbliste = Array.from(radiobuttons);
          for(var i = 0; i < rbliste.length; i ++){
            rbliste[i].addEventListener('click', leggTilFav);
          }
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
    id.innerHTML = element.id;
    rekke.appendChild(id);

    // oppretter span-element for navn
    var navn = document.createElement("td");
    navn.innerHTML = element.navn;
    rekke.appendChild(navn);

    // oppretter span-element for latitude
    var latitude = document.createElement("td");
    latitude.innerHTML = element.latitude;
    rekke.appendChild(latitude);

    // oppretter span-element for longitude
    var longitude = document.createElement("td");
    longitude.innerHTML = element.longitude;
    rekke.appendChild(longitude);

    var favoritt = document.createElement("td");
    favoritt.innerHTML = "<input type='radio' name='favoritt' class='rbutton'></input>"
    favoritt.childNodes[0].classList.add(element.latitude);
    rekke.appendChild(favoritt);

    return rekke;
};


function regnUtAvstand(){
  var a = document.getElementById("plass1").value;
  var b = document.getElementById("plass2").value;

  var tallMellomEnOgHundre= /^[1-9][0-9]?$|^100$/;
  var bokstaver = /[a-zA-Z]/;
  if(a.match(tallMellomEnOgHundre)){
    a = dataliste[a-1];
  }
  else if(a.match(bokstaver)){4
    for(var i = 0; i < dataliste.length; i++){
      if(dataliste[i].navn.includes(a)){
        a = dataliste[i];
      }
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
  }
  document.getElementById("avstanden").innerHTML = "Avstanden mellom lekeplassene "+ a.navn + " og "+ b.navn +" er "+ sjekkAvstand(a, b) + " km";
}
function leggTilFav(){
  for(var i = 0; i < rbliste.length; i++){
    if(rbliste[i].checked){
      for(var j = 0; j<dataliste.length; j++){
        if(rbliste[i].className.includes(dataliste[j].latitude)){
          oppdaterFav(dataliste[j]);
          break;
        }
      }
    }
  }
}

function oppdaterFav(lekeplass){
  document.getElementById("favLekeplassId").value = lekeplass.id;
  var favLekeplassKnapp = document.getElementById("lekeplassLink");
  favLekeplassKnapp.href = "minFavLekeplass.html?favLekeplassId="+lekeplass.id;
}
