function startprogram() {
  console.log("JavaScript-fil 'index.js' hører til dette dokumentet");
}

//  Gjør at scriptet ikke prøver å finne hamburger-elementet før siden
//  er ferdig innlastet, og unngår null-pointer
window.onload = function(){
  var hamb = document.getElementById("hamburger");

  if(hamb){
    console.log("trykket");
    hamb.addEventListener("click", endreNavn);
    //  Gjør slik at elementene i hambugrerklassen bytter navn
    //  og endrer style i CSS-dokumentet
    hamb.addEventListener("click", function(){hamb.classList.toggle("change");});
  } else {
    console.log("nope");
  }
};

  function endreNavn() {
    var x = document.getElementById("topNav");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}
