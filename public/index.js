var app = function(){
  var url = "https://restcountries.eu/rest/v1/all";
  makeRequest(url, requestComplete);
};

var makeRequest = function(url, callback){
  //creat a new XMLHttpRequest
  var request = new XMLHttpRequest();
  //open the request, tell it what method we want to use
  request.open("GET", url);
  //set the callback we want it to run when complete
  request.onload = callback;
  //send the request
  request.send();
};

var requestComplete = function(){
  console.log("BOOM!");
  if (this.status !== 200) return;

  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateList(countries);
};

var populateList = function(countries){
  var ul = document.getElementById('country-list');
  countries.forEach(function(country){
    var li = document.createElement('li');
    li.innerText = country.name;
    ul.appendChild(li);
  });
};

window.onload = app;
