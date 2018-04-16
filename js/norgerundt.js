var norgeRundtListe;
window.onload = function(){
  loadData();
  hamburger();
}
function loadData() {
    var url = "https://hotell.difi.no/api/json/nrk/norge-rundt?";
    promise = getURL(url);
    promise.then(
	     function(response) {
          norgeRundtListe = JSON.parse(response).entries;
          console.log(norgeRundtListe)
          document.getElementById("norgerundtdatasett").innerHTML=JSON.stringify(norgeRundtListe);
          visSøk();
	     }
    ).catch(
	     function(reason) { alert("FEIL: " + reason);}
    );
}
// Viser og skjuler avansert søk ved klikk
 function visSøk(){
    var knapp = document.getElementById("avansertSøkKnapp");
    if(knapp){
      knapp.addEventListener("click", function(){
        var avansert = document.getElementById("boksTilSøk");
        if (avansert.style.display === "flex") {
          avansert.style.display = "none";
          knapp.innerHTML='Vis filtrering  <a class="fa fa-sort-desc"></a>';
        } else {
          avansert.style.display = "flex";
          knapp.innerHTML='Skjul filtrering <a class="fa fa-sort-asc"></a>';
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
    
}
  function skjemaSøk(){
    console.log("nå skal vi søke fra skjemaet");
  }
