var dataliste;
var page = 103;
window.onload = function(){
  loadData();
  hamburger();
  loadYears();
  document.getElementById("navLeft").addEventListener("click", pageLeft);
  document.getElementById("navRight").addEventListener("click", pageRight);
  document.getElementById("sideVelger").addEventListener("change", goToChosenPage);
}
function loadData() {
    var url = "https://hotell.difi.no/api/json/nrk/norge-rundt?page=" + page;
    promise = getURL(url);
    promise.then(
	     function(response) {
          dataliste = JSON.parse(response).entries;
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
    rekke.setAttribute("id", element.video_url);

    // oppretter span-element for link
    var tittel = document.createElement("td");
    var videolink = "<a href='" + element.video_url + "'>"+element.tittel+"</a>";
    tittel.innerHTML = element.tittel;
    rekke.appendChild(tittel);

    // oppretter span-element for årstall
    var årstall = document.createElement("td");
    årstall.innerHTML = element.aar;
    rekke.appendChild(årstall);

    // oppretter span-element for sted
    var sted = document.createElement("td");
    sted.innerHTML = element.kommune;
    sted.classList.add("fjerneMobil");
    rekke.appendChild(sted);

    // oppretter span-element for tema
    var tema = document.createElement("td");
    tema.innerHTML = element.tema;
    tema.classList.add("fjerneMobil");
    rekke.appendChild(tema);

    // oppretter span-element for antrekk
    var antrekk = document.createElement("td");
    antrekk.innerHTML = element.antrekk;
    antrekk.classList.add("fjerneMobil");
    rekke.appendChild(antrekk);

    var link = document.createElement("td");
    link.innerHTML = "<a href=" + element.video_url + "><a class='fa fa-external-link-square'></a> </a>";
    rekke.appendChild(link);
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
    document.getElementById("filtrerSøk").addEventListener("click",filtrerSøk);
    document.getElementById("tilbakestillSøk").addEventListener("click",tilbakesillSøk);
    //gir fjern-filter-knappen funksjon
    document.getElementById("tilbakestillSøk").addEventListener("click", tilbakestillSøk);

  }

  function pageLeft(){
    if(page != 1){
      goToPage(page-1);
    }
  }
  function pageRight(){
    if(page < 103){
      goToPage(page+1);
    }
  }
  function goToChosenPage(){
    var valgtSide = document.getElementById("sideVelger").value;
    if(valgtSide<104&&valgtSide>0){
      goToPage(valgtSide);
    }
  }
  function goToPage(s){
    page = s;
    console.log(page);
    document.getElementById("tableBody").innerHTML="";
    document.getElementById("sideVelger").value = page;
    loadData()
  }
function filtrerSøk(){
  var kvinnligHovedrolle = document.getElementById("kvinne").checked;
  var mannligHovedrolle = document.getElementById("herre").checked;
  var årsall = document.getElementById("årstall").value;
  var frisøk = document.getElementById("frisøk").value;

  for(var i = 0; i<dataliste.length; i++){

    if(kvinnligHovedrolle){
      if(dataliste[i].hovedperson1_kjonn != "Kvinne"){
        document.getElementById(dataliste[i].video_url).style.display = "none";
      }else{
        console.log(dataliste[i].tittel+" Har kvinnelig hovedrolle");
      }
    }
  }
  console.log("filtrere");
}
function tilbakesillSøk() {
 console.log("tilbakestiller");
}
