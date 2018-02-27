function visSøk(){
  var avansert = document.getElementById("avansertSøk");
  if(avansert.style.display === "block") avansert.style.display = "none";
  else avansert.style.display = "block";
}

function loadFile() {
  var fil = new XMLHttpRequest();
  fil.open("GET", 'http://hotell.difi.no/api/json/bergen/dokart?', true);
  fil.onreadystatechange = function(){
    if(fil.readyState === 4){
      if(fil.status === 200 || fil.status == 0){
      var tekst = fil.responseText;
        document.getElementById("toaletter").innerHTML = tekst;
      }
    }
  }
  fil.send(null);
}
