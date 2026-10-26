import "./template.html";
import "./styles.css";
import * as app from "./app";
import { setupWeatherInfos } from "./dom.js";

window.app = app;

setupWeatherInfos();
