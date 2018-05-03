var dataliste;
var page = 1;
window.onload = function(){
  loadData();
  hamburger();
  visSøk();
  document.getElementById("navLeft").addEventListener("click", pageLeft);
  document.getElementById("navRight").addEventListener("click", pageRight);
  document.getElementById("sideVelger").addEventListener("change", goToChosenPage);
}

function loadData() {
    var url = "https://hotell.difi.no/api/json/nrk/norge-rundt?page="+page+"&kommune=Bergen";
    promise = getURL(url);
    promise.then(
	     function(response) {
          dataliste = JSON.parse(response).entries;
          addIdsToEntries();
          loadFile();
          loadYears();
	     }
    ).catch(
	     function(reason) {
         alert("FEIL: " + reason);
       }
    );
}

function addIdsToEntries(){
  for(var i = 0; i < dataliste.length; i++){
    dataliste[i].id = i;
  }
}

function loadYears() {
  var selector = document.getElementById("årstall");
  selector.innerHTML="<option value='ikkeValgt'>Velg</option>"

  var firstYearOfList = dataliste[0].aar;
  var lastYearOfList = dataliste[(dataliste.length)-1].aar;
  for(var i = firstYearOfList; i <= lastYearOfList; i++){
    var valg = document.createElement("option");
    valg.text = i;
    selector.add(valg);
  }
}

function createElement(element) {
    var rekke = document.createElement("tr");
    rekke.setAttribute("id", element.id);
    rekke.classList.add("tabellPåNettsiden");

    // Oppretter span-element for tittel
    var tittel = document.createElement("td");
    var videolink = "<a href='" + element.video_url + "'>"+element.tittel+"</a>";
    tittel.innerHTML = element.tittel;
    rekke.appendChild(tittel);

    // Oppretter span-element for årstall
    var årstall = document.createElement("td");
    årstall.innerHTML = element.aar;
    rekke.appendChild(årstall);

    // Oppretter span-element for tema
    var tema = document.createElement("td");
    tema.innerHTML = element.tema;
    tema.classList.add("fjerneMobil");
    rekke.appendChild(tema);

    // Oppretter span-element for antrekk
    var antrekk = document.createElement("td");
    antrekk.innerHTML = element.antrekk;
    antrekk.classList.add("fjerneMobil");
    rekke.appendChild(antrekk);

    //Oppretter span-elementet for link
    var link = document.createElement("td");
    link.innerHTML = "<a href=" + element.video_url + " target='_blank'>🔗</a>";
    rekke.appendChild(link);
    return rekke;
};

// Viser og skjuler avansert søk ved klikk på knappen
function visSøk(){
    var knapp = document.getElementById("avansertSøkKnapp");
    if(knapp){
      knapp.addEventListener("click", function(){
        var avansert = document.getElementById("boksTilSøk");
        if (avansert.style.display === "flex") {
          avansert.style.display = "none";
          knapp.innerHTML='Vis filtrering';
        }
        else {
          avansert.style.display = "flex";
          knapp.innerHTML='Skjul filtrering';
        }
      });
    }
    else {
      console.log("Finner ikke elementet 'avansertSøkKnapp'");
    }
    //Gir filtrer-knappen funksjon
    document.getElementById("filtrerSøk").addEventListener("click", filtrerSøk);
    //Gir fjern-filter-knappen funksjon
    document.getElementById("tilbakestillSøk").addEventListener("click", tilbakestillSøk);
}

function pageLeft(){
    if(page != 1){
      goToPage(page - 1);
    }
    else {
      alert("Du er på første side.");
    }
}

function pageRight(){
    if(page <= 7){
      goToPage(page + 1);
    }
    else {
      alert("Du er på siste side.");
    }
}

function goToChosenPage(){
    var valgtSide = document.getElementById("sideVelger").value;
    if(valgtSide < 9 && valgtSide > 0){
      goToPage(valgtSide);
    }
    else alert("Valgt side finnes ikke, vennligst velg en annen");
}

function goToPage(s){
    page = s;
    document.getElementById("tableBody").innerHTML="";
    document.getElementById("sideVelger").value = page;
    loadData();
}

function filtrerSøk(){
  var kvinneligHovedrolle = document.getElementById("kvinne").checked;
  var mannligHovedrolle = document.getElementById("herre").checked;
  var årstall = document.getElementById("årstall").value;
  var frisøk = document.getElementById("frisøk").value;

  for(var i = 0; i < dataliste.length; i++){

    if(kvinneligHovedrolle == true){
      if(dataliste[i].hovedperson1_kjonn != "Kvinne"){
        document.getElementById(dataliste[i].id).style.display = "none";
      }
    }
    if(mannligHovedrolle == true){
      if(dataliste[i].hovedperson1_kjonn != "Mann"){
        document.getElementById(dataliste[i].id).style.display = "none";
      }
    }
    if(årstall <= 2018 && årstall >= 1976){
      if(dataliste[i].aar != årstall){
        document.getElementById(dataliste[i].id).style.display = "none";
      }
    }
    if(frisøk){
      frisøk = frisøk.toUpperCase();
      var søk = dataliste[i].tittel.toUpperCase();
        if(søk.includes(frisøk) ||
          dataliste[i].tema.toUpperCase().includes(frisøk) ||
          dataliste[i].antrekk.toUpperCase().includes(frisøk)){
        //Gjør ingenting - beholder elementene i listen
        }
        else {
          document.getElementById(dataliste[i].id).style.display = "none";
        }
    }
  }

  var tabellPåNettsiden = document.getElementsByClassName("tabellPåNettsiden");
  var antallSynligeRekker = 0;
  
  for(var j = 0 ; j < tabellPåNettsiden.length; j++){
    if(tabellPåNettsiden[j].style.display != "none"){
      antallSynligeRekker ++;
    }
  }
  if(antallSynligeRekker == 0){
    ingenSøketreff();
  }
}

function tilbakestillSøk() {
 for (var i = 0; i < dataliste.length; i++) {
   document.getElementById(dataliste[i].id).style.display = "table-row";
 }
   document.getElementById("ingenSøketreff").style.display = "none";
   fjernAlleChecked();
}

function fjernAlleChecked(){
  document.getElementById("kvinne").checked = false;
  document.getElementById("herre").checked = false;
  document.getElementById("frisøk").value = "";
}

function ingenSøketreff(){
  document.getElementById("ingenSøketreff").style.display = "block";
  document.getElementById("ingenSøketreff").innerHTML = "Det finnes ingen episoder som passer dine kriterer."
}
