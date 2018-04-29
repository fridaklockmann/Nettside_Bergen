var dataliste;
var page = 1;
window.onload = function(){
  loadData();
  hamburger();
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
          visSøk();
          loadYears();
	     }
    ).catch(
	     function(reason) { alert("FEIL: " + reason);}
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

    // oppretter span-element for link
    var tittel = document.createElement("td");
    var videolink = "<a href='" + element.video_url + "'>"+element.tittel+"</a>";
    tittel.innerHTML = element.tittel;
    rekke.appendChild(tittel);

    // oppretter span-element for årstall
    var årstall = document.createElement("td");
    årstall.innerHTML = element.aar;
    rekke.appendChild(årstall);

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
    link.innerHTML = "<a href=" + element.video_url + " target='_blank'><i class='fa fa-external-link-square'></i> </a>";
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
          knapp.innerHTML='Vis filtrering  <i class="fa fa-sort-desc"></i>';
        } else {
          avansert.style.display = "flex";
          knapp.innerHTML='Skjul filtrering <i class="fa fa-sort-asc"></i>';
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
    }else{
      alert("Du er på første side.");
    }
}
function pageRight(){
    if(page <= 7){
      goToPage(page + 1);
    }else{
      alert("Du er på siste side.");
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
    document.getElementById("tableBody").innerHTML="";
    document.getElementById("sideVelger").value = page;
    loadData()
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
        document.getElementById(dataliste[i].id).style.display="none";
      }
    }
    if(frisøk){
      frisøk = frisøk.toUpperCase();
      for(var i = 0; i < dataliste.length; i++){
        var søk = dataliste[i].tittel.toUpperCase();
        if(søk.includes(frisøk) ||
          dataliste[i].tema.toUpperCase().includes(frisøk) ||
          dataliste[i].antrekk.toUpperCase().includes(frisøk)){
        //Gjør ingenting - beholder elementene i listen
        }
        else{
          document.getElementById(dataliste[i].id).style.display = "none";
        }
      }
    }
  }
}//End filtrersøk

function tilbakesillSøk() {
 for (var i = 0; i < dataliste.length; i++) {
   document.getElementById(dataliste[i].id).style.display = "table-row";
   fjernAlleChecked();
 }
}

function fjernAlleChecked(){
document.getElementById("kvinne").checked = false;
document.getElementById("herre").checked = false;
document.getElementById("frisøk").value= "";

}
