import { returnWeatherInfos } from "./app";

const weatherContainer = document.querySelector(".weather-container");
const nextDaysContainer = document.querySelector(".next-days-container");
const weatherContainerTitle = document.createElement("h1");
weatherContainer.appendChild(weatherContainerTitle);

const btnUnit = document.getElementById("unit");
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

    const searchCity = document.getElementById("searchInput").value.trim();
    if (searchCity.length === 0) return;

    const city = await returnWeatherInfos(searchCity);

    if (!city) {
      lastCity = undefined;
      weatherContainer.replaceChildren();
      nextDaysContainer.replaceChildren();
      weatherContainer.appendChild(weatherContainerTitle);
      weatherContainerTitle.textContent = "Unfound result";
      return;
    }

    lastCity = city;
    formCity.reset();
    renderWeatherInfos(city);
  });
}

export function renderWeatherInfos(city) {
  weatherContainerTitle.textContent = city.name.toUpperCase();
  weatherContainer.replaceChildren();
  nextDaysContainer.replaceChildren();
  weatherContainer.appendChild(weatherContainerTitle);

  weatherContainer.classList.add(city.icon);

  weatherContainer.append(
    makeElement("p", city.description, "current-description"),
    makeElement("p", city.dateTime, "current-date"),
    makeElement("p", formatTemp(city.temperature, "current-temp")),
    makeElement("p", city.icon, "current-icon"),
  );

  nextDaysContainer.append(makeElement("h2", "Forecast for the next days"));

  for (const day of city.nextDays) {
    const div = document.createElement("div");
    div.classList.add("day-card");
    div.classList.add(`${day.icon}`);

    div.append(
      makeElement("p", day.dateTime, "day-date"),
      makeElement("p", day.description, "day-description"),
      makeElement("p", `Max: ${formatTemp(day.tempMax)}`, "day-max"),
      makeElement("p", `Min: ${formatTemp(day.tempMin)}`, "day-min"),
      makeElement("p", `UV index: ${day.uvIndex}`, "day-uv"),
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

export function setupUnit() {
  btnUnit.addEventListener("click", () => {
    if (lastCity === undefined) {
      return;
    }

    if (btnUnit.textContent === "°F") {
      unit = "°F";
      btnUnit.textContent = "°C";
      renderWeatherInfos(lastCity);
    } else {
      unit = "°C";
      btnUnit.textContent = "°F";
      renderWeatherInfos(lastCity);
    }
  });
}
