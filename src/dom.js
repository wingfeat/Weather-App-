import { returnWeatherInfos } from "./app";

export function setupWeatherInfos() {
  const formCity = document.getElementById("formCity");

  formCity.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchCity = document.getElementById("searchInput").value.trim();

    if (searchCity.length === 0) return;

    const city = await returnWeatherInfos(searchCity);
    if (!city) return;

    console.log(city.name);

    formCity.reset();
  });
}
