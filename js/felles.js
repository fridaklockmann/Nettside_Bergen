window.onload = function(){
  hamburger()
};

function getURL(url) {
  return new Promise(function(resolve, reject){
	   var xhr = new XMLHttpRequest();
	   xhr.open("GET", url);
	   xhr.onreadystatechange = function() {
	      if (xhr.readyState === 4) {
		         if (xhr.status === 200) {
		             resolve(xhr.response);
		         } else {
		             reject(xhr.statusText);
		         }
	        }
	    };
	    xhr.send();
  });
}

function loadFile() {
  var tabell = document.getElementById("tableBody");
  var length = Object.keys(dataliste).length;
  for (var i = 0; i<length; i++){
    tabell.appendChild(createElement(dataliste[i]));
  }
}

function sjekkAvstand(sted1, sted2){
  var lat1 = sted1.latitude;
  var lon1 = sted1.longitude;
  var lat2 = sted2.latitude;
  var lon2 = sted2.longitude;

  var radius = 6371; //Jordens radius

  //Her bruker vi Haversine formelen til å regne ut avstanden mellom punktene. Den tar høyde for at jorden ikke er flat
  var gradLat = gradTilRadian(lat2 - lat1);
  var gradLon = gradTilRadian(lon2 - lon1);

  var a =
    Math.sin(gradLat / 2) * Math.sin(gradLat / 2) +
    Math.cos(gradTilRadian(lat1)) * Math.cos(gradTilRadian(lat2)) *
    Math.sin(gradLon / 2) * Math.sin(gradLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = radius * c;
  return d.toFixed(3); //Returnerer avstanden med 3 desimaler
}

function gradTilRadian(grad){
  return grad * (Math.PI/180)
}

//Snur strekene i hamburgermenyen ved klikk
 function hamburger(){
  var hamb = document.getElementById("hamburger");
  if(hamb){
    hamb.addEventListener("click", endreNavn);
    //  Gjør slik at elementene i hambugrerklassen bytter navn og endrer style i CSS-dokumentet
    hamb.addEventListener("click", function(){hamb.classList.toggle("change");});
  } else {
    console.log("Finner ikke elementet 'hamburger'");
  }
};

//Bytter klassenavnene til strekene i hamburgermenyen, slik at de får andre egenskaper i CSS-filen
function endreNavn() {
  var topNav = document.getElementById("topNav");
  if (topNav.className === "navbar") {
      topNav.className += " responsive";
  } else {
      topNav.className = "navbar";
  }
}
