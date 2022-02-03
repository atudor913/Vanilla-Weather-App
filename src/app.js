/*DATE INTERGRATION*/
let setting = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDay = days[setting.getDay()];
let currentMin = setting.getMinutes();
let currentHour = setting.getHours();
let currentMonth = months[setting.getMonth()];

let currentSettings = `${currentDay} ${currentHour}:${currentMin}`;
console.log(currentSettings);

let inputTime = document.querySelector("#time-date");
inputTime.innerHTML = currentSettings;

/*FORECAST*/

function showForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast-temps");
  let forecastHTML = `<div class="row">`;
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
      <div class="col-2">
            <div class="forecast_one" id="forecast-one">
              <div class="day_one" id="day-one">${day}</div>
              
               <img src="http://openweathermap.org/img/wn/10d@2x.png"
            alt=""
            width="65"/>
            </div>
              <div class="forcast_temp">
              <span id="max-temp">1° </span>
              <span id="min-temp">8°</span>
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  forecastHTML = forecastHTML + "<hr/>";
  forecastElement.innerHTML = forecastHTML;
  forecastHTML =
    forecastHTML +
    `<footer><a href="https://github.com/atudor913/Vanilla-Weather-App">Open Source-Code</a> by Aisha-Noor Tudor</footer>`;
  forecastElement.innerHTML = forecastHTML;
}

/*API WEATHER INTERGRATION*/

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "10d1c4efa3b825ba6b0336d233f5ea47";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

/*DISPLAY WEATHER*/
function showWeather(response) {
  console.log(response);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    `${response.data.main.temp}`
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  let weatherIcon = document
    .querySelector("#temp-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  celciusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

/*SEARCH DATA INTERGRATION*/

function showCity(city) {
  let apiKey = "10d1c4efa3b825ba6b0336d233f5ea47";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#chosen-city").value;
  showCity(city);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahTemp = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahTemp);
}

function showCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let search = document.querySelector("#submit-form");
search.addEventListener("submit", handleSubmit);

let celciusTemp = null;

let fahrenheit = document.querySelector("#fahLink");
fahrenheit.addEventListener("click", showFahrenheit);

let celcius = document.querySelector("#celLink");
celcius.addEventListener("click", showCelcius);

/*(0°C × 9/5) + 32 = 32°F
 */

/*FUNCTION CALLS*/

showCity("Brooklyn");
