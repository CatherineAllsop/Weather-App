function formatDate(){
   let now = new Date ();
   let dateToday = document.querySelector("#date-today");
   let dayToday = document.querySelector("#day-today");
   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
   let day = days[now.getDay()];
   let date = now.getDate();
   let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   let month = months[now.getMonth()];
   let year = now.getFullYear();
   let hours = now.getHours();
   if (hours < 10) {hours = `0${hours}`};
   let minutes = now.getMinutes();
   if (minutes < 10) {minutes = `0${minutes}`};
   dateToday.innerHTML = `${day} ${date} ${month} ${year}, ${hours}:${minutes}`;
   dayToday.innerHTML = `${day}`;
}
formatDate();


let citySearchForm = document.querySelector("#city-search-form");
function citySearch(event){
event.preventDefault();
let city = document.querySelector("#search-input").value;
search(city);
}
function displayTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#todays-temperature").innerHTML = Math.round (response.data.main.temp);
  document.querySelector("#wind").innerHTML = Math.round (response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = Math.round (response.data.main.humidity);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
}
citySearchForm.addEventListener("submit", citySearch);

function search(city) {
  let apiKey = "540d7044742ae29f4d3c2d9968a739fd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
search("London");


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "540d7044742ae29f4d3c2d9968a739fd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}