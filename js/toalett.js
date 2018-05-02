//  Gjør at scriptet ikke prøver å finne elementer før siden
//  er ferdig innlastet, og unngår null-pointer
window.onload = function(){
//  hentdataliste();
  hamburger();
  loadData();
  loadTime();
};

var correctLabel = 0;
var dataliste="";

function loadData() {
    var url = "https://hotell.difi.no/api/json/bergen/dokart?";
    promise = getURL(url);
    promise.then(
	     function(response) {
	        var doliste = JSON.parse(response);
          dataliste = doliste.entries;
          visSøk();
          loadFile();
          initMap();
	     }
    ).catch(
	     function(reason) { alert("FEIL: " + reason);}
    );
}

function loadTime() {
  var selector = document.getElementById("åpen");
  selector.innerHTML="<option value='ikkeValgt'>Velg</option>"
  for(var i = 0; i <= 23; i++){
    var valg = document.createElement("option");
    if(i < 10) i = "0" + i;
    valg.text = i + ":00";
    selector.add(valg);
  }
}

// Viser og skjuler avansert søk ved klikk
 function visSøk(){
    var knapp = document.getElementById("avansertSøkKnapp");
    if(knapp){
      knapp.addEventListener("click", function(){
        var avansert = document.getElementById("boksTilSøk");
        if (avansert.style.display === "flex") {
          avansert.style.display = "none";
          knapp.innerHTML = 'Vis filtrering';
        } else {
          avansert.style.display = "flex";
          knapp.innerHTML = 'Skjul filtrering';
        }
      });
    }
    else {
      console.log("Finner ikke elementet 'avansertSøkKnapp'");
    }
    //Gir filtrerknappen funksjon
    var filtrerSøkKnapp = document.getElementById("filtrerSøk");
    filtrerSøkKnapp.addEventListener("click", skjemaSøk);
    //Gir fjern-filter-knappen funksjon
    document.getElementById("tilbakestillSøk").addEventListener("click", tilbakestillSøk);
    //Gir hurtigsøk en funksjon
    document.getElementById("hurtigsøk").addEventListener("keypress", function(e){
      var key = e.which || e.keyCode;
      if (key == 13){
        hurtigSøk();
      }
    });
}
var map = "";

//Array til å lagre markørene i
var markerArray = [];
function initMap() {
  if(dataliste != ""){
    var bergen = {
      lat: 60.39299,
      lng: 5.327455
    };
    //Lager kart med Bergen i sentrum
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: bergen
    });

    //Lager punkter på kartet
    for(var i = 0; i < Object.keys(dataliste).length; i++){
      setMarker(i,i);
    }
  }
} //End initMap

function setMarker(i,label){
  //Finner geoLocations for punktet på tabellen
  var toalettPosisjon = {
    lat: parseFloat(dataliste[i].latitude),
    lng: parseFloat(dataliste[i].longitude)
  };

  //Setter markør på kartet
  var bergen = new google.maps.Marker({
    position: toalettPosisjon,
    map: map,
    label: (label+1).toString(),
    title: dataliste[i].plassering
  });
  //Lagrer markørene i Array
  markerArray[i]=bergen;
}

//Legger til elementer i tabellen
function createElement(element) {
  var listItem = document.createElement("li");
  listItem.classList.add("toalett");
  listItem.setAttribute("id", element.id);
  listItem.innerHTML = element.plassering.charAt(0).toUpperCase() + element.plassering.slice(1).toLowerCase();
  //var listChild = document.createElement("ul");
  //var listAdresse = document.createElement("li");
  //listAdresse.innerHTML = element.adresse;
//  listChild.appendChild(listAdresse);
//  listItem.appendChild(listChild);
  return listItem;
};

//Dette er søkeobjektet vårt
var searchCriteria = {
  kvinneSøk:false,
  herreSøk:false,
  rullestolSøk:false,
  stelleromSøk:false,
  gratisSøk:false,
  åpenNåSøk:false,
  maxPrisSøk:"",
  åpenSøk:"ikkeValgt",
  adresseSøk:""
}

function hurtigSøk(){
  //lagrer søket i en tabell
  var hSøk = document.getElementById("hurtigsøk").value;
  var splittet = hSøk.split(" ");
  for(var i = 0; i < splittet.length; i++){
    if(splittet[i].includes(":")){
      var nøkkel_verdi = splittet[i].split(":");
      splittet[i] = nøkkel_verdi;
    }
  }
  for(var i = 0; i < splittet.length; i++){
    if(typeof(splittet[i])==="string"){
      if(splittet[i]=="herre"||splittet[i]=="mann"){
        searchCriteria.herreSøk=true;
        document.getElementById("herre").checked = true;
      }else if(splittet[i]=="kvinne"||splittet[i]=="dame"){
        searchCriteria.kvinneSøk=true;
        document.getElementById("kvinne").checked = true;
      }else if(splittet[i]=="rullestol" ||splittet[i]=="rullestoltilgang" ){
        searchCriteria.rullestolSøk=true;
        document.getElementById("rullestol").checked = true;
      }else if(splittet[i]=="stellerom"){
        searchCriteria.stelleromSøk=true;
        document.getElementById("stellerom").checked = true;
      }else if(splittet[i]=="gratis"){
        document.getElementById("gratis").checked = true;
        searchCriteria.gratisSøk=true;
      }else if(splittet[i]=="åpen"){
        document.getElementById("åpenNå").checked = true;
        searchCriteria.åpenNåSøk=true;
      }else if(splittet[i]!=""){
        searchCriteria.adresseSøk=splittet[i];
        document.getElementById("søkAdresse").value = splittet[i];
      }
    }else{
      if(splittet[i][0] == "kjønn"){
        if(splittet[i][1] == "herre"||splittet[i][1]=="mann"){
          searchCriteria.herreSøk = true;
          document.getElementById("herre").checked = true;
        }
        if(splittet[i][1] == "dame"||splittet[i][1]=="kvinne"){
          searchCriteria.kvinneSøk = true;
          document.getElementById("kvinne").checked = true;
        }
      }
      if(splittet[i][0] == "max"||splittet[i][0]=="maks"){
        searchCriteria.maxPrisSøk = splittet[i][1];
        document.getElementById("makspris").value = splittet[i][1];
      }
      if(splittet[i][0] == "åpent"){
        searchCriteria.åpenSøk = splittet[i][1];
        document.getElementById("åpen").value = splittet[i][1];
      }
    }
  }
  avansertSøk(searchCriteria);

  //tilbakestilller søk dersom man søker på en tom string
  if(hSøk == "" || hSøk == " "){
    tilbakestillSøk();
  }
}

function skjemaSøk(){
  //true hvis kvinne er huket av, false hvis ikke.
  searchCriteria.kvinneSøk = document.getElementById("kvinne").checked;
  searchCriteria.herreSøk = document.getElementById("herre").checked;
  searchCriteria.rullestolSøk = document.getElementById("rullestol").checked;
  searchCriteria.stelleromSøk = document.getElementById("stellerom").checked;
  searchCriteria.gratisSøk = document.getElementById("gratis").checked;
  searchCriteria.åpenNåSøk = document.getElementById("åpenNå").checked;
  searchCriteria.maxPrisSøk = document.getElementById("makspris").value;
  searchCriteria.åpenSøk = document.getElementById("åpen").value;
  searchCriteria.adresseSøk = document.getElementById("søkAdresse").value;
  avansertSøk(searchCriteria);
}

//Avansert søk
function avansertSøk(searchCriteria){
 var kvinneSøk = searchCriteria.kvinneSøk;
 var herreSøk = searchCriteria.herreSøk;
 var rullestolSøk = searchCriteria.rullestolSøk;
 var stelleromSøk = searchCriteria.stelleromSøk;
 var gratisSøk = searchCriteria.gratisSøk;
 var åpenNåSøk = searchCriteria.åpenNåSøk;
 var maxPrisSøk = searchCriteria.maxPrisSøk;
 var åpenSøk = searchCriteria.åpenSøk;
 var adresseSøk = searchCriteria.adresseSøk;

 //Går igjennom hele listen
 for(var i = 0; i < dataliste.length; i++){
  //Fjerner markørene til alle toalettene
  markerArray[i].setMap(null);

  //Hvis rullestol er huket av
  if(rullestolSøk){
    //Fjerner alle toaletter uten rullesotltilgang fra listen
    if(dataliste[i].rullestol < 1 || dataliste[i].rullestol == "NULL"){
      document.getElementById(dataliste[i].id).style.display = "none";
      }
    }
  if(kvinneSøk){
    // Fjerner alle toaletter uten dametoalett fra listen
    if(dataliste[i].dame < 1 || dataliste[i].dame == "NULL"){
      document.getElementById(dataliste[i].id).style.display = "none";
      }
    }
    if(herreSøk){
      // fjerner alle toaletter uten herretoalett fra listen
      if(dataliste[i].herre < 1 || dataliste[i].herre == "NULL" && dataliste[i].pissoir_only != 1){
        document.getElementById(dataliste[i].id).style.display = "none";

      }
    }
    if(stelleromSøk){
      // fjerner alle toaletter uten stellerom fra listen
      if(dataliste[i].stellerom < 1 || dataliste[i].stellerom == "NULL"){
        document.getElementById(dataliste[i].id).style.display = "none";

      }
    }
    if(gratisSøk){
      // fjerner alle toaletter som ikke er gratis fra listen
      // må lage sjekk for null, men vi fikk det ikke til nå
      slettToaletterOverPrisen("0");
    }
    if(åpenNåSøk){
      var inTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
      var time = parseInt(inTime.replace(":", "."));
      // søndag = 0, mandag = 1, tirsdag = 2, onsdag = 3, torsdag = 4 osv..
      var day = new Date().getDay();

      if(day > 1 && day < 6){
        //sjekker for hverdager
        sjekkÅpningstid(dataliste[i].tid_hverdag, null);
      } if(day == 0){
        //sjekker for søndager
        sjekkÅpningstid(dataliste[i].tid_sondag, null);
      } if(day == 6){
        //sjekker for lørdager
        sjekkÅpningstid(dataliste[i].tid_lordag, null);
      }
    }//end åpentNåSøk.

    if(åpenSøk != "ikkeValgt"){
      var inTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
      var time = parseInt(inTime.replace(":", "."));
      var day = new Date().getDay();
      // Dersom klokkeslettet ikke enda har vært i dag, gjelder søket for denne dagen; ellers gjelder det for i morgen
      if(time > åpenSøk){
        if(day == 6){
          day = 0;
        } else {
          day += 1;
        }
      }
      if(day >= 1 && day < 6){
        //sjekker for hverdager
        sjekkÅpningstid(dataliste[i].tid_hverdag, åpenSøk);
      } if(day == 0){
        //sjekker for søndager
        sjekkÅpningstid(dataliste[i].tid_sondag, åpenSøk);
      } if(day == 6){
        //sjekker for lørdager
        sjekkÅpningstid(dataliste[i].tid_lordag, åpenSøk);
      }
    }
    function sjekkÅpningstid(tid_dagtype, nu){
      if(tid_dagtype.includes("-")){
        var tider = tid_dagtype.split(" - ");
        if(nu != null){
          if(nu < parseInt(tider[0]) || nu > parseInt(tider[1])){
            document.getElementById(dataliste[i].id).style.display = "none";
          }
        } else{
            if(time < parseInt(tider[0]) || time >= parseInt(tider[1])){
              document.getElementById(dataliste[i].id).style.display = "none";
            }
        }
    } else if(tid_dagtype=="NULL"){
      document.getElementById(dataliste[i].id).style.display = "none";
    }
  }//end sjekkÅpningstid
    if(maxPrisSøk!=""){
      var maxPris = parseInt(maxPrisSøk);
      slettToaletterOverPrisen(maxPris);
    }
    function slettToaletterOverPrisen(maxpris){
      if(dataliste[i].pris > maxpris && dataliste[i].pris!= "NULL"){
        document.getElementById(dataliste[i].id).style.display = "none";
      }
    }
    if(adresseSøk){
      adresseSøk = adresseSøk.toUpperCase();
      for(var j = 0; j < dataliste.length; j++){
        var adresse = dataliste[j].adresse.toUpperCase().replace(/[0-9]/g,'');
        if(adresse.includes(adresseSøk) || dataliste[j].place.toUpperCase().includes(adresseSøk)){
          //do nothing
        }
        else{
          document.getElementById(dataliste[j].id).style.display = "none";
        }
      }
    }//end adressesøk
  } //end forløkke
    setNewMarkers();
}//end avansert søk.
function tilbakestillSøk(){
  for (var i = 0; i < dataliste.length; i++) {
    searchCriteria.kvinneSøk=false,
    searchCriteria.herreSøk=false,
    searchCriteria.rullestolSøk=false,
    searchCriteria.stelleromSøk=false,
    searchCriteria.gratisSøk=false,
    searchCriteria.åpenNåSøk=false,
    searchCriteria.maxPrisSøk="",
    searchCriteria.åpenSøk="ikkeValgt",
    searchCriteria.adresseSøk=""
    document.getElementById(dataliste[i].id).style.display = "list-item";
    initMap();
    fjernAlleChecked();

  }
}
function fjernAlleChecked(){
  document.getElementById("kvinne").checked = false;
  document.getElementById("herre").checked = false;
  document.getElementById("rullestol").checked = false;
  document.getElementById("stellerom").checked = false;
  document.getElementById("gratis").checked = false;
  document.getElementById("åpenNå").checked = false;
  document.getElementById("makspris").value = "";
  document.getElementById("søkAdresse").value = "";
  document.getElementById("hurtigsøk").value= "";
  document.getElementById("ingenToalett").innerHTML = "";
}

function setNewMarkers(){
  var htmlListe = document.getElementById("tableBody").childNodes;
  for(var i = 0; i < htmlListe.length; i++){
    if(htmlListe[i].style.display != "none"){
      setMarker((i),correctLabel);
      correctLabel++;
    }
  }
  if(correctLabel == 0){
    ingenToalett();
  }
  correctLabel = 0;
}

function ingenToalett(){
  document.getElementById("ingenToalett").style.display = "block";
  document.getElementById("ingenToalett").innerHTML = "Det finnes ingen toaletter som matcher dine kriterer."
}
