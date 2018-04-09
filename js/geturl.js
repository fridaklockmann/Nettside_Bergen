function getURL(url) {
  return new Promise(function(resolve, reject) {
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
  for(var i = 0; i<length; i++){
    tabell.appendChild(createElement(dataliste[i]));
  }
}
