import { returnWeatherInfos } from "./app";

const weatherContainer = document.querySelector(".weather-container");
const nextDaysContainer = document.querySelector(".next-days-container");
const weatherContainerTitle = document.createElement("h1");

export function setupWeatherInfos() {
  const formCity = document.getElementById("formCity");

  formCity.addEventListener("submit", async (event) => {
    event.preventDefault();
    weatherContainer.replaceChildren();
    nextDaysContainer.replaceChildren();
    weatherContainer.appendChild(weatherContainerTitle);

    const searchCity = document.getElementById("searchInput").value.trim();
    if (searchCity.length === 0) return;

    const city = await returnWeatherInfos(searchCity);
    console.log(city);

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

  weatherContainer.append(
    makeElement("p", city.description),
    makeElement("p", city.dateTime),
    makeElement("p", city.temperature),
    makeElement("p", city.icon),
  );

  nextDaysContainer.append(makeElement("h2", "Previsions for next few days"));

  for (const day of city.nextDays) {
    const div = document.createElement("div");

    div.append(makeElement("p", day.description));
    nextDaysContainer.appendChild(div);
  }
}

function makeElement(tag, text, css) {
  const element = document.createElement(tag);
  element.textContent = text;
  element.classList.add(css);
  return element;
}
