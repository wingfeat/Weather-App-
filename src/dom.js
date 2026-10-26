import { returnWeatherInfos } from "./app";
import { format, parseISO } from "date-fns";

const weatherContainer = document.querySelector(".weather-container");
const nextDaysContainer = document.querySelector(".next-days-container");
const weatherContainerTitle = document.createElement("h1");
const loader = document.querySelector(".loader");
const btnUnit = document.getElementById("unit");
let unit = "°C";
let lastCity;

weatherContainer.appendChild(weatherContainerTitle);

function makeElement(tag, text, css) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (css) element.classList.add(css);

  return element;
}

function formatDate(dateTime) {
  const date = parseISO(dateTime);
  const textDate = format(date, "E dd MMM");

  return textDate;
}

export function setupWeatherInfos() {
  const formCity = document.getElementById("formCity");

  formCity.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchCity = document.getElementById("searchInput").value.trim();
    if (searchCity.length === 0) return;

    loader.hidden = false;
    const city = await returnWeatherInfos(searchCity);
    loader.hidden = true;

    if (!city) {
      lastCity = undefined;
      weatherContainer.replaceChildren();
      nextDaysContainer.replaceChildren();
      weatherContainer.appendChild(weatherContainerTitle);
      weatherContainerTitle.textContent = "Unfound result";
      weatherContainer.className = "weather-container";
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

  weatherContainer.className = `weather-container ${city.icon}`;

  weatherContainer.append(
    makeElement("p", city.description, "current-description"),
    makeElement(
      "p",
      `Updated at: ${city.dateTime.slice(0, -3)}`,
      "current-date",
    ),
    makeElement("p", formatTemp(city.temperature), "current-temp"),
    makeElement("p", city.icon, "current-icon"),
  );

  nextDaysContainer.append(makeElement("h2", "Forecast for the next days"));

  for (const day of city.nextDays) {
    const div = document.createElement("div");
    div.classList.add("day-card");
    div.classList.add(`${day.icon}`);

    div.append(
      makeElement("p", formatDate(day.dateTime), "day-date"),
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
