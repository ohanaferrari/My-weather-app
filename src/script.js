function displayTemperature(response) {
  let temperatureElement = document.querySelector(".temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector(".city");
  let condition = document.querySelector(".condition");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let icon = document.querySelector(".icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  condition.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" />`;

  let cityTimestamp = response.data.time * 1000; // convert to ms
  let cityDate = new Date(cityTimestamp);
  let cityHour = cityDate.getHours();

  document.body.style.backgroundImage = getBackgroundImage(response.data.condition.description, cityHour);
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}

function search(city) {
  let apiKey = "at320d4o2fcf70104aac4f08799bd0b0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-form-input");
  let city = searchInput.value;

  search(city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let time = document.querySelector(".time");
  time.innerHTML = ` ${hours}:${minutes}`;	

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  let weekDay = document.querySelector(".week-day");
  weekDay.innerHTML = `${formattedDay}`;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searchSubmit);

let currentDate = new Date();
formatDate(currentDate);

function getBackgroundImage(condition, cityHour) {
  condition = condition.toLowerCase();

  let isDay = cityHour >= 6 && cityHour < 18;

  if (condition.includes("clear")) {
    return isDay ? "url('images/clear-day.jpg')" : "url('images/clear-night.jpg')";
  } else if (condition.includes("cloud")) {
    return isDay ? "url('images/cloudy-day.jpg')" : "url('images/cloudy-night.jpg')";
  } else if (condition.includes("rain")) {
    return isDay ? "url('images/rainy-day.jpg')" : "url('images/rainy-night.jpg')";
  } else if (condition.includes("snow")) {
    return isDay ? "url('images/snow-day.jpg')" : "url('images/snow-night.jpg')";
  } else if (condition.includes("storm") || condition.includes("thunder")) {
    return isDay ? "url('images/storm.jpg')" : "url('images/storm.jpg')";
  } else if (condition.includes("mist") || condition.includes("fog")) {
    return isDay ? "url('images/fog-day.jpg')" : "url('images/fog-night.jpg')";
  } else {
    return isDay ? "url('images/default-day.jpg')" : "url('images/default-night.jpg')";
  }
}

search("Florianópolis");