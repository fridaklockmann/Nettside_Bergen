var lekeplassliste="ikke oppdatert";
var toalettliste="ikke oppdatert";
var link ="";
var dataTeller = 0;
var favorittLekeplass="";
var nærmesteLekeplass="";
var nærmesteToalett= "";
window.onload = function(){
  var locate = window.location;
  link = locate;

  loadData("https://hotell.difi.no/api/json/bergen/lekeplasser?");
  loadData("https://hotell.difi.no/api/json/bergen/dokart?");

}

function loadData(url) {
    promise = getURL(url);
    promise.then(
	     function(response) {
          var tempDataListe = JSON.parse(response).entries;
          if(/lekeplasser/.test(url)){
            lekeplassliste = tempDataListe;
            dataTeller += 1;
          }
          if(/dokart/.test(url)){
            toalettliste = tempDataListe;
            dataTeller += 1;
          }
          if (dataTeller >=2){
            oppdaterFav(link);
          }
	     }
    ).catch(
	     function(reason) { alert("FEIL: " + reason);}
    );
}

function oppdaterFav(text){
  var favLekeplassId = delineate(text.href);
  for(var i = 0; i<lekeplassliste.length; i++){
    if(lekeplassliste[i].id == favLekeplassId){
        favorittLekeplass = lekeplassliste[i];
        nærmesteLekeplass = nærmeste(lekeplassliste);
        nærmesteToalett = nærmeste(toalettliste);
        document.getElementById("favOverskrift").innerHTML = lekeplassliste[i].navn;
        document.getElementById("firstP").innerHTML = "Nærmeste andre lekeplass er " + nærmesteLekeplass.navn+ "." +  " Den er "+sjekkAvstand(favorittLekeplass,nærmesteLekeplass) + "km unna" ;
        document.getElementById("seccondP").innerHTML = "Nærmeste toalett er her: " + nærmesteToalett.plassering+"." +  " Det er "+sjekkAvstand(favorittLekeplass,nærmesteToalett) + "km unna" ;
    }
  }
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
