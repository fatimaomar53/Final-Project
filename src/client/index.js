// index.js
import "./assets/styles/main.scss";

import { initializeApp } from "./js/app.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  initializeApp();
});
