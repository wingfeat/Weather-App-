import "./template.html";
import "./styles.css";
import * as app from "./app";
import { setupWeatherInfos, setupUnit } from "./dom.js";

window.app = app;

setupWeatherInfos();
setupUnit();
