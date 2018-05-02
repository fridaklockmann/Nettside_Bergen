var dataliste="ikke oppdatert";
var toalettliste="ikke oppdatert";
var link ="";
var dataTeller = 0;
var favorittLekeplass="";
var nærmesteLekeplass="";
var nærmesteToalett= "";

window.onload = function(){
  hamburger();
  var locate = window.location;
  link = locate;
  document.getElementById("googleForm").addEventListener("submit",google);
  loadData("https://hotell.difi.no/api/json/bergen/lekeplasser?");
  loadData("https://hotell.difi.no/api/json/bergen/dokart?");
}

function loadData(url) {
    promise = getURL(url);
    promise.then(
	     function(response) {
          var tempDataListe = JSON.parse(response).entries;
          if(/lekeplasser/.test(url)){
            dataliste = tempDataListe;
            dataTeller += 1;
            generateDOM();
            makeRadiobuttonsWork();
          }
          if(/dokart/.test(url)){
            toalettliste = tempDataListe;
            dataTeller += 1;
          }
	     }
    ).catch(
	     function(reason) { alert("FEIL: " + reason);}
    );
}

function makeRadiobuttonsWork(){
  var radiobuttons = document.getElementsByClassName("rbutton");
  rbliste = Array.from(radiobuttons);
  for(var i = 0; i < rbliste.length; i ++){
    rbliste[i].addEventListener('click', leggTilFav);
  }
}

function createElement(element){
  var rekke = document.createElement("tr");
  rekke.setAttribute("id", element.id);

  var id = document.createElement("td");
  id.innerHTML = element.id;
  rekke.appendChild(id);
  // oppretter span-element for navn
  var navn = document.createElement("td");
  navn.innerHTML = element.navn;
  rekke.appendChild(navn);

  var favoritt = document.createElement("td");
  favoritt.innerHTML = "<input type='radio' name='favoritt' class='rbutton'></input>"
  favoritt.childNodes[0].classList.add(element.latitude);
  rekke.appendChild(favoritt);
  return rekke;
}

function generateDOM(){
  document.getElementById("LekeplassTabell").innerHTML =
          '<table class="tabell">  <thead>  <th>ID</th> <th>Lekeplass</th> <th>Favoritt</th> </thead> <tbody id ="tableBody"> </tbody> </table>';
  loadFile();
}

function nærmeste(liste){
  var nærmeste = "";
  var avstandTilNærmeste=9999;
  for(var i = 0; i<liste.length; i++){
    var avstandTilDenne = sjekkAvstand(liste[i],favorittLekeplass);
    if(avstandTilDenne<avstandTilNærmeste && avstandTilDenne>0){
      nærmeste = liste[i];
      avstandTilNærmeste = avstandTilDenne;
    }
  }
  return nærmeste;
}

function delineate(str){
  lekeplassIdIndex = str.indexOf("=") + 1;
  return(str.substring(lekeplassIdIndex));
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
  favorittLekeplass = lekeplass;
  nærmesteLekeplass = nærmeste(dataliste);
  nærmesteToalett = nærmeste(toalettliste);
  document.getElementById("favOverskrift").innerHTML = lekeplass.navn;
  document.getElementById("firstP").innerHTML = "Nærmeste andre lekeplass er " + nærmesteLekeplass.navn+ "." +  " Den er "+sjekkAvstand(favorittLekeplass,nærmesteLekeplass) + "km unna" ;
  document.getElementById("seccondP").innerHTML = "Nærmeste toalett er her: " + nærmesteToalett.plassering+"." +  " Det er "+sjekkAvstand(favorittLekeplass,nærmesteToalett) + "km unna" ;
  //scroller brukeren opp til toppen av siden slik at han/hun ser at siden ble oppdatert.
  document.documentElement.scrollTop = 0;
}
