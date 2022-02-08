function formatDate(){
   let now = new Date ();
   let dateToday = document.querySelector("#date-today");
   let dayToday = document.querySelector("#day-today");
   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", ];
   let day = days[now.getDay()];
   let hours = now.getHours();
   if (hours < 10) {hours = `0${hours}`};
   let minutes = now.getMinutes();
   if (minutes < 10) {minutes = `0${minutes}`};
   dateToday.innerHTML = `${day} ${hours}:${minutes}`;
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
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#todays-temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  let iconElement = document.querySelector("#icons");
  iconElement.setAttribute(
  "src", 
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
  let adviceComment = document.querySelector("#advice-comment");
  if (response.data.weather[0].main === `Clouds`) 
  {adviceComment.innerHTML = `A jacket and shades weather!`;}
    else if (response.data.weather[0].main  === `Rain`)
    {adviceComment.innerHTML = `Remember an umbrella!`;}
      if (response.data.weather[0].main  === `Snow`)
      {adviceComment.innerHTML = `Wrap up warm!`;}
      else if (response.data.weather[0].main  === `Clear`)
      {adviceComment.innerHTML = `Remember your sunglasses!`;}
        if (response.data.weather[0].main  === `Fog`)
        {adviceComment.innerHTML = `Be careful out there!`;}
  let headerImage = document.querySelector("#header-image");
  if (response.data.weather[0].main === `Clouds`)
  {headerImage.setAttribute("src", "images/cloudy.png");
  headerImage.setAttribute("alt", response.data.weather[0].main);}
    else if (response.data.weather[0].main  === `Rain`)
    {headerImage.setAttribute("src", "images/rain.png");
    headerImage.setAttribute("alt", response.data.weather[0].main);}
      if (response.data.weather[0].main  === `Snow`)
      {headerImage.setAttribute("src", "images/snow.png");
      headerImage.setAttribute("alt", response.data.weather[0].main);}
      else if (response.data.weather[0].main  === `Clear`)
      {headerImage.setAttribute("src", "images/sunny.png");
      headerImage.setAttribute("alt", response.data.weather[0].main);}
        if (response.data.weather[0].icon.includes(`n`)) 
        {headerImage.setAttribute("src", "images/night.png");
        headerImage.setAttribute("alt", "nighttime");}
}
citySearchForm.addEventListener("submit", citySearch);


let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#todays-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active-unit");
  fahrenheitLink.classList.add("active-unit");
}

let celsiusTemperature = null;
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
function displayCelsiusTemperature(event){
event.preventDefault();
let temperatureElement = document.querySelector("#todays-temperature");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
celsiusLink.classList.add("active-unit");
fahrenheitLink.classList.remove("active-unit");
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tue", "Wed"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function(day){
    forecastHTML = forecastHTML + `
    <div class="col-3">
    <div class="future-days">${day}</div>
    <div class="future-temps"><span>0</span><span class="units">°c | °f</span></div>
    <img src="" alt="" class="weather-icons" />
    </div>
    `;
  });
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}
displayForecast();

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
  axios.get(apiUrl).then(displayTemperature);}