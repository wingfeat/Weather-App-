# Weather App

A weather forecast site built for [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-weather-app) curriculum (Full Stack JavaScript path).

Search for any city to see its current weather and a 5-day forecast, and switch between Celsius and Fahrenheit.

## Features

- **City search** with names containing spaces or accents (`New York`, `Saint-Étienne`)
- **Current weather**: temperature, description and last update time
- **5-day forecast**: day of the week, max/min temperatures and UV index
- **Celsius / Fahrenheit toggle**, instant and without a new API request
- **Weather-based colors**: the background changes with the conditions (sunny, rain, snow, fog…)
- **Loading indicator** while waiting for the API
- **Clear error message** when a city cannot be found

## Built with

- HTML, CSS and vanilla JavaScript (ES modules)
- [Webpack](https://webpack.js.org/) for bundling
- [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api) for the weather data
- [date-fns](https://date-fns.org/) for date formatting

## What I learned

- **Asynchronous JavaScript**: Promises, `async` / `await`, and why a function marked `async` always returns a Promise
- **Fetching data from an API** with `fetch`, and handling both kinds of errors: network failures (caught automatically) and bad responses such as a 404 (checked with `response.ok` and turned into errors with `throw`)
- **Processing raw JSON** into a small object holding only the data the app needs, using `slice` and `map`
- **Separating responsibilities**: one module talks to the API, another renders the page
- **UI state**: the app stores the last weather data and the chosen unit, so switching units only re-renders the page instead of fetching again
- **Avoiding repetition** with small helper functions, such as one that creates an element with its text and class

## Getting started

```bash
git clone git@github.com:wingfeat/Weather-App-.git
cd Weather-App-
npm install
npm run dev
```

## About the API key

The Visual Crossing API key is visible in the source code. As explained in the Odin Project assignment, this is acceptable here because the key is free and public. In a real application, a key like this should stay on a server and never be sent to the browser.
