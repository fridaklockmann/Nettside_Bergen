//  Gjør at scriptet ikke prøver å finne elementer før siden
//  er ferdig innlastet, og unngår null-pointer
window.onload = function(){
  hamburger();
  visSøk();
  loadFile();
};

//lager hamburgermeny
 function hamburger(){
  var hamb = document.getElementById("hamburger");
  if(hamb){
    console.log("Hamburger-meny fungerer!");
    hamb.addEventListener("click", endreNavn);
    //  Gjør slik at elementene i hambugrerklassen bytter navn og endrer style i CSS-dokumentet
    hamb.addEventListener("click", function(){hamb.classList.toggle("change");});
  } else {
    console.log("Finner ikke elementet 'hamburger'");
  }
};

//bytter navn på classene, slik at man får andre egenskaper i css-filen
  function endreNavn() {
    var topNav = document.getElementById("topNav");
    if (topNav.className === "navbar") {
        topNav.className += " responsive";
    } else {
        topNav.className = "navbar";
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
        } else {
          avansert.style.display = "flex";
        }
      });
    }
    else {
      console.log("Finner ikke elementet 'avansertSøkKnapp'");
    }
    //gir filtrerknappen funksjon
    var filtrerSøkKnapp = document.getElementById("filtrerSøk");
    filtrerSøkKnapp.addEventListener("click", skjemaSøk);
    //gir fjern-filter-knappen funksjon
    document.getElementById("tilbakestillSøk").addEventListener("click", tilbakestillSøk);
    //gir hurtigsøk en funksjon
    document.getElementById("hurtigsøk").addEventListener("keypress", function(e){
      var key = e.which || e.keyCode;
      if (key == 13){
        hurtigSøk();
      }
    });
}
//Array til å lagte markørene i
var markerArray = [];
function initMap() {
  var bergen = {
    lat: 60.39299,
    lng: 5.327455
  };
  //lager kart med sentrum i Bergen
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: bergen
  });

  //lager punkter på kartet.
  for(var i = 0; i < toalettliste.length; i++){
    //finner geoLocations for punktet på tabellen
    var toalettPosisjon = {
      lat: parseFloat(toalettliste[i].latitude),
      lng: parseFloat(toalettliste[i].longitude)
    };

    //Setter markør på kartet
    var bergen = new google.maps.Marker({
      position: toalettPosisjon,
      map: map,
      label: toalettliste[i].id,
      title: 'Toalett nummer: ' + toalettliste[i].id
    });
    //lagrer markørene i Array
    markerArray[i]=bergen;
  }
} //end initMap


function loadFile() {
  var tabell = document.getElementById("tableBody");
  toalettliste.forEach(
    function(element){ tabell.appendChild(createElement(element));}
  )
}

//legger til elementer i tabellen
function createElement(element) {
    var rekke = document.createElement("tr");
    rekke.classList.add("toalett");
    rekke.setAttribute("id", element.id);

    // oppretter span-element for id
    var id = document.createElement("td");
    id.classList.add("id");
    id.innerHTML = element.id;
    rekke.appendChild(id);

    // oppretter span-element for plassering
    var plassering = document.createElement("td");
    plassering.classList.add("plassering");
    plassering.innerHTML = element.plassering;
    rekke.appendChild(plassering);

    // oppretter span-element for adresse
    var adresse = document.createElement("td");
    adresse.classList.add("adresse");
    adresse.innerHTML = element.adresse;
    rekke.appendChild(adresse);

    // oppretter span-element for pris
    var pris = document.createElement("td");
    pris.classList.add("pris");
    pris.innerHTML = element.pris;
    rekke.appendChild(pris);

    // oppretter span-element for tid hverdag
    var tid_hverdag = document.createElement("td");
    tid_hverdag.classList.add("tid_hverdag");
    tid_hverdag.innerHTML = element.tid_hverdag;
    rekke.appendChild(tid_hverdag);

    // oppretter span-element for tid_lørdag
    var tid_lørdag = document.createElement("td");
    tid_lørdag.classList.add("tid_lørdag");
    tid_lørdag.innerHTML = element.tid_lordag;
    rekke.appendChild(tid_lørdag);

    // oppretter span-element for tid_søndag
    var tid_søndag = document.createElement("td");
    tid_søndag.classList.add("tid_søndag");
    tid_søndag.innerHTML = element.tid_sondag;
    rekke.appendChild(tid_søndag);
  //Her har vi også muligheten til å legge inn kjønn i tabellen
  /*  // oppretter span-element for dame
    var dame = document.createElement("td");
    dame.classList.add("dame");
    dame.innerHTML = element.dame;
    rekke.appendChild(dame);

    // oppretter span-element for herre
    var herre = document.createElement("td");
    herre.classList.add("herre");
    herre.innerHTML = element.herre;
    rekke.appendChild(herre);

    */

    // oppretter span-element for rullestol
    var rullestol = document.createElement("td");
    rullestol.classList.add("dame");
    rullestol.innerHTML = element.rullestol;
    rekke.appendChild(rullestol);

    // oppretter span-element for stellerom
    var stellerom = document.createElement("td");
    stellerom.classList.add("stellerom");
    stellerom.innerHTML = element.stellerom;
    rekke.appendChild(stellerom);

    // oppretter span-element for pissoir_only
    var pissoir_only = document.createElement("td");
    pissoir_only.classList.add("pissoir_only");
    pissoir_only.innerHTML = element.pissoir_only;
    rekke.appendChild(pissoir_only);


  //  console.log(rekke);
    return rekke;
};


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
      console.log(splittet[i]+" er en string");
      if(splittet[i]=="herre"||splittet[i]=="mann"){
        searchCriteria.herreSøk=true;
      }else if(splittet[i]=="kvinne"||splittet[i]=="dame"){
        searchCriteria.kvinneSøk=true;
      }else if(splittet[i]=="rullestol"){
        searchCriteria.rullestolSøk=true;
      }else if(splittet[i]=="stellerom"){
        searchCriteria.stelleromSøk=true;
      }else if(splittet[i]=="gratis"){
        searchCriteria.gratisSøk=true;
      }else if(splittet[i]=="åpen"){
        searchCriteria.åpenNåSøk=true;
      }else if(splittet[i]!=""){
        searchCriteria.adresseSøk=splittet[i];
      }
    }else{
      if(splittet[i][0] == "kjønn"){
        if(splittet[i][1] == "herre"||splittet[i][1]=="mann") searchCriteria.herreSøk = true;
        if(splittet[i][1] == "dame"||splittet[i][1]=="kvinne") searchCriteria.kvinneSøk = true;
      }
      if(splittet[i][0] == "max"||splittet[i][0]=="maks") searchCriteria.maxPrisSøk = splittet[i][1];
      if(splittet[i][0] == "åpent")searchCriteria.åpenSøk = splittet[i][1];

    }
    avansertSøk(searchCriteria);
    if(hSøk==""){
      tilbakestillSøk();
    }

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


//Avansert søk!
function avansertSøk(searchCriteria){
 var kvinneSøk=searchCriteria.kvinneSøk;
 var herreSøk=searchCriteria.herreSøk;
 var rullestolSøk=searchCriteria.rullestolSøk;
 var stelleromSøk = searchCriteria.stelleromSøk;
 var gratisSøk = searchCriteria.gratisSøk;
 var åpenNåSøk = searchCriteria.åpenNåSøk;
 var maxPrisSøk = searchCriteria.maxPrisSøk;
 var åpenSøk = searchCriteria.åpenSøk;
 var adresseSøk = searchCriteria.adresseSøk;


  //Går igjennom hele listen
  for(var i = 0; i < toalettliste.length; i++){
    //Hvis rullestol er huket av
    if(rullestolSøk){
      // fjerner alle toaletter uten rullesotltilgang fra listen
      if(toalettliste[i].rullestol < 1 || toalettliste[i].rullestol == "NULL"){
        document.getElementById(toalettliste[i].id).style.display = "none";
        //fjerner markørene til disse toalettene
        markerArray[toalettliste[i].id-1].setMap(null);
      }
    }
    if(kvinneSøk){
      // fjerner alle toaletter uten dametoalett fra listen
      if(toalettliste[i].dame < 1 || toalettliste[i].dame == "NULL"){
        document.getElementById(toalettliste[i].id).style.display = "none";
        //fjerner markørene til disse toalettene
        markerArray[toalettliste[i].id-1].setMap(null);
      }
    }
    if(herreSøk){
      // fjerner alle toaletter uten herretoalett fra listen
      if(toalettliste[i].herre < 1 || toalettliste[i].herre == "NULL" && toalettliste[i].pissoir_only != 1){
        document.getElementById(toalettliste[i].id).style.display = "none";
        //fjerner markørene til disse toalettene
        markerArray[toalettliste[i].id-1].setMap(null);
      }
    }
    if(stelleromSøk){
      // fjerner alle toaletter uten stellerom fra listen
      if(toalettliste[i].stellerom < 1 || toalettliste[i].stellerom == "NULL"){
        document.getElementById(toalettliste[i].id).style.display = "none";
        //fjerner markørene til disse toalettene
        markerArray[toalettliste[i].id-1].setMap(null);
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
        sjekkÅpningstid(toalettliste[i].tid_hverdag, null);
      }if(day == 0){
        //sjekker for søndager
        sjekkÅpningstid(toalettliste[i].tid_sondag, null);
      }
      if(day == 6){
        //sjekker for lørdager
        sjekkÅpningstid(toalettliste[i].tid_lordag, null);
      }
    }//end åpentNåSøk.

    if(åpenSøk!="ikkeValgt"){
      var inTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
      var time = parseInt(inTime.replace(":", "."));
      var day = new Date().getDay();
      // Dersom klokkeslettet ikke enda har vært i dag, gjelder søket for denne dagen; ellers gjelder det for i morgen
      if(time > åpenSøk){
        if(day == 6){
          day = 0;
        }else{
          day += 1;
        }
      }
      if(day >= 1 && day < 6){
        //sjekker for hverdager
        sjekkÅpningstid(toalettliste[i].tid_hverdag, åpenSøk);
      }if(day == 0){
        //sjekker for søndager
        sjekkÅpningstid(toalettliste[i].tid_sondag, åpenSøk);
      }
      if(day == 6){
        //sjekker for lørdager
        sjekkÅpningstid(toalettliste[i].tid_lordag, åpenSøk);
      }
    }
    function sjekkÅpningstid(tid_dagtype, nu){
      if(tid_dagtype.includes("-")){
        var tider = tid_dagtype.split(" - ");
        if (nu != null){
          if(nu < parseInt(tider[0]) || nu > parseInt(tider[1])){
            document.getElementById(toalettliste[i].id).style.display = "none";
            //fjerner markørene til disse toalettene
            markerArray[toalettliste[i].id-1].setMap(null);
          }
        }else{
            if(time < parseInt(tider[0]) || time >= parseInt(tider[1])){
              document.getElementById(toalettliste[i].id).style.display = "none";
              //fjerner markørene til disse toalettene
              markerArray[toalettliste[i].id-1].setMap(null);
            }
        }
    }else if(tid_dagtype=="NULL"){
      document.getElementById(toalettliste[i].id).style.display = "none";
      //fjerner markørene til disse toalettene
      markerArray[toalettliste[i].id-1].setMap(null);
    }
  }//end sjekkÅpningstid
    if(maxPrisSøk!=""){
      var maxPris = parseInt(maxPrisSøk);
      slettToaletterOverPrisen(maxPris);
    }
    function slettToaletterOverPrisen(maxpris){
      if(toalettliste[i].pris > maxpris && toalettliste[i].pris!= "NULL"){
        document.getElementById(toalettliste[i].id).style.display = "none";
        //fjerner markørene til disse toalettene
        markerArray[toalettliste[i].id-1].setMap(null);
      }
    }

  if(adresseSøk){
    adresseSøk = adresseSøk.toUpperCase();
    for(var i = 0; i < toalettliste.length; i++){
      var adresse = toalettliste[i].adresse.toUpperCase().replace(/[0-9]/g,'');
      if(adresse.includes(adresseSøk) ||
        toalettliste[i].place.toUpperCase().includes(adresseSøk)){
        console.log("Fant adressen/navnet");
      }
      else{
        document.getElementById(toalettliste[i].id).style.display = "none";
        markerArray[toalettliste[i].id-1].setMap(null);
      }
    }
  }//end adressesøk
  }
}//end avansert søk.
function tilbakestillSøk(){
  console.log("fjernerfilter");
  for (var i = 0; i < toalettliste.length; i++) {
    searchCriteria.kvinneSøk=false,
    searchCriteria.herreSøk=false,
    searchCriteria.rullestolSøk=false,
    searchCriteria.stelleromSøk=false,
    searchCriteria.gratisSøk=false,
    searchCriteria.åpenNåSøk=false,
    searchCriteria.maxPrisSøk="",
    searchCriteria.åpenSøk="ikkeValgt",
    searchCriteria.adresseSøk=""
    document.getElementById(toalettliste[i].id).style.display = "table-row";
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
}
