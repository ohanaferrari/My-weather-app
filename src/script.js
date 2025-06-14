function displayTemperature(response) {
  let temperatureElement = document.querySelector(".temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
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

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searchSubmit);

search("Florianópolis");