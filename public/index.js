var selectedCountryIndex = 5;

var app = function(){
  var url = "https://restcountries.eu/rest/v1/all";
  var countries = [];

  if (localStorage.length !== 0){
    console.log("update from ls");
    selectedCountryIndex = localStorage["selectedCountryIndex"];
  };
  makeRequest(url, requestComplete);
  var select = document.getElementById('country-list');
  select.onchange = displayCountryDetails;
};

var displayCountryDetails = function functionName() {
  var liName = document.getElementById('country-name');
  liName.innerText = countries[this.value].name;
  var liName = document.getElementById('country-population');
  liName.innerText = countries[this.value].population;
  var liName = document.getElementById('country-capital');
  liName.innerText = countries[this.value].capital;
  localStorage["selectedCountryIndex"] = this.value;
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
  countries = JSON.parse(jsonString);
  console.log(countries);
  populateList(countries);
};

var populateList = function(countries){
  var select = document.getElementById('country-list');
  for (i=0; i<countries.length; i++){
    var option = document.createElement('option');
      option.innerText = countries[i].name;
      option.value = i;
      select.appendChild(option);
    };
    console.log(this);
    // select.children[parseInt(this.selectedCountryIndex)].selected = true;
    // select.click();
    select.selectedIndex = this.selectedCountryIndex;
    select.onchange();
}.bind(this);

window.onload = app;
