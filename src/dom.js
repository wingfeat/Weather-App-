import { returnWeatherInfos } from "./app";

const weatherContainer = document.querySelector(".weather-container");
const weatherContainerTitle = document.createElement("h1");
weatherContainer.appendChild(weatherContainerTitle);

export function setupWeatherInfos() {
  const formCity = document.getElementById("formCity");

  formCity.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchCity = document.getElementById("searchInput").value.trim();
    if (searchCity.length === 0) return;

    const city = await returnWeatherInfos(searchCity);
    if (!city) {
      weatherContainerTitle.textContent = "Unfound result";
      return;
    }

    formCity.reset();
    renderWeatherInfos(city);
  });
}

export function renderWeatherInfos(city) {
  weatherContainerTitle.textContent = city.name;
}
