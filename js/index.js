//  Gjør at scriptet ikke prøver å finne hamburger-elementet før siden
//  er ferdig innlastet, og unngår null-pointer
// window.onload = function(){
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

  function endreNavn() {
    var topNav = document.getElementById("topNav");
    if (topNav.className === "navbar") {
        topNav.className += " responsive";
    } else {
        topNav.className = "navbar";
    }
}
