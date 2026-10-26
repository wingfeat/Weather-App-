import { returnWeatherInfos } from "./app";

const weatherContainer = document.querySelector(".weather-container");
const nextDaysContainer = document.querySelector(".next-days-container");
const weatherContainerTitle = document.createElement("h1");
const btnUnity = document.getElementById("unity");
let unit = "°C";
let lastCity;

function makeElement(tag, text, css) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (css) element.classList.add(css);

  return element;
}

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
    lastCity = city;
  });
}

export function renderWeatherInfos(city) {
  weatherContainerTitle.textContent = city.name;

  weatherContainer.append(
    makeElement("p", city.description),
    makeElement("p", city.dateTime),
    makeElement("p", formatTemp(city.temperature)),
    makeElement("p", city.icon),
  );

  nextDaysContainer.append(makeElement("h2", "Forecast for the next days"));

  for (const day of city.nextDays) {
    const div = document.createElement("div");

    div.append(
      makeElement("p", day.dateTime),
      makeElement("p", day.description),
      makeElement("span", day.icon),
      makeElement("p", day.preciptype),
      makeElement("p", formatTemp(day.tempMax)),
      makeElement("p", formatTemp(day.tempMin)),
      makeElement("p", day.uvIndex),
    );
    nextDaysContainer.appendChild(div);
  }
}

function formatTemp(celsius) {
  if (unit === "°F") {
    celsius = Math.round((celsius * 9) / 5 + 32) + unit;
  } else {
    celsius = Math.round(celsius) + unit;
  }
  return celsius;
}
