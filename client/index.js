import "./styles/style.scss";
import { initializeApp } from "./js/app";
import destinationImage from "./views/media/1-final project.jpg";

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();

  // Set the image source dynamically
  const imageElement = document.querySelector(".destination-img");
  if (imageElement) {
    imageElement.src = destinationImage;
  }
});
