var APPID = "457a2f94cb16375e0687627a9f77bc58";
var icon;
var temperature;
var loc;
var description;
var unitChange = true;
var celsius = temperature-273.15;
var faren = temperature*(9/5)- 459.67;

function updateByZip(zip){
  var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "zip=" + zip +
    "&APPID=" + APPID;

  sendRequest(url);
}

function updateByGeo(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "lat=" + lat +
    "&lon=" + lon +
    "&APPID=" + APPID;

  sendRequest(url);

}

function sendRequest(url){
  var xmlhttp = new XMLHttpRequest ();
  xmlhttp.onload = function () {
    if (xmlhttp.status == 200){
      var data = JSON.parse(xmlhttp.responseText);
      var weather = [];
      weather.icon = data.weather[0].id;
      weather.loc = data.name;
      weather.description = data.weather[0].main;
      weather.temperature = data.main.temp;
      weather.faren = weather.temperature*(9/5)- 459.67;
      weather.celsius = weather.temperature - 273.15;

      update(weather);

    } else {

      alert("API cannot be reached");

    }

  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

}


function update(weather) {
   //temperature = weather.temperature;
   loc.innerHTML = weather.loc;
   description.innerHTML = weather.description;
   icon.src = "/icons/"+ weather.icon + ".png";
   faren.innerHTML = Math.round(weather.faren);
   celsius = Math.round(weather.celsius);


  farenButton.onclick = function(){

     if (unitChange === false) {
       faren.innerHTML = Math.round(weather.faren);
       farenButton.classList.add("selected");
       celsiusButton.classList.remove("selected");
       unitChange = true;

      }
    };

    celsiusButton.onclick = function() {
      if (unitChange === true) {

      faren.innerHTML = celsius;
      celsiusButton.classList.add("selected");
      farenButton.classList.remove("selected");
      unitChange = false;

     }
   };
}

function showPosition(position) {
  updateByGeo (position.coords.latitude, position.coords.longitude);

}

window.onload = function () {
    icon = document.getElementById("icon");
    temperature = document.getElementById("temperature");
    faren = document.getElementById("faren");
    loc = document.getElementById("loc");
    description = document.getElementById("description");


  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  }else{
    zip = window.prompt("Can't find you! What is your zip code?");
    updateByZip(zip);

  }


};
