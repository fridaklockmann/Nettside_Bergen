var norgeRundtListe;
window.onload = function(){
  loadData();
  hamburger();
  loadYears();
}
function loadData() {
    var url = "https://hotell.difi.no/api/json/nrk/norge-rundt?";
    promise = getURL(url);
    promise.then(
	     function(response) {
          dataliste = JSON.parse(response).entries;
          console.log(dataliste);
          loadFile();
          visSøk();
	     }
    ).catch(
	     function(reason) { alert("FEIL: " + reason);}
    );
}
function loadYears() {
  var selector = document.getElementById("årstall");
  for(var i = 1975; i < 2019; i++){
    var valg = document.createElement("option");
    valg.text = i;
    selector.add(valg);
  }
}

function createElement(element) {
    var rekke = document.createElement("tr");

    // oppretter span-element for link
    var link = document.createElement("td");
    link.innerHTML = element.video_url;
    rekke.appendChild(link);

    // oppretter span-element for årstall
    var årstall = document.createElement("td");
    årstall.innerHTML = element.aar;
    rekke.appendChild(årstall);

    // oppretter span-element for sted
    var sted = document.createElement("td");
    sted.innerHTML = element.kommune;
    rekke.appendChild(sted);

    // oppretter span-element for tittel
    var tittel = document.createElement("td");
    tittel.innerHTML = element.tittel;
    rekke.appendChild(tittel);

    // oppretter span-element for tema
    var tema = document.createElement("td");
    tema.innerHTML = element.tema;
    rekke.appendChild(tema);

    // oppretter span-element for antrekk
    var antrekk = document.createElement("td");
    antrekk.innerHTML = element.antrekk;
    rekke.appendChild(antrekk);

    // oppretter span-element for følelse
    var følelse = document.createElement("td");
    følelse.innerHTML = element.folelse;
    rekke.appendChild(følelse);

    return rekke;
};

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
