## README.md

# Travel App Project

This is a web-based travel planning app. By providing a destination and a travel date, users can access geographical data, weather information, and relevant images through third-party APIs.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [API Configuration](#api-configuration)
- [Scripts](#scripts)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Travel App Project is a web application built with JavaScript, Express, Webpack, and Sass. It uses APIs from Geonames, Weatherbit, and Pixabay to provide users with detailed information about their travel destinations, including current weather, geographical location, and relevant images.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:

````bash
git clone https://github.com/yourusername/travel-app.git
cd travel-app


2. **Install dependencies**:

   ```bash
   npm install
````

3. **Create a `.env` file** in the root directory and add your API keys:

GEONAMES_API_KEY=your_geonames_username
WEATHERBIT_API_KEY=your_weatherbit_api_key
PIXABAY_API_KEY=your_pixabay_api_key

Replace `your_geonames_username`, `your_weatherbit_api_key`, and `your_pixabay_api_key` with your actual API keys.

## Usage

To run the application, follow these steps:

1. **Build the project**:

`````bash
npm run build

2. **Start the API server**:


````bash
npm run start-server

This will start the server at http://localhost:8080.


3. Starting the Client

```bash
npm start

The client will be served at http://localhost:8081.


4. Access the application: Open your browser and navigate to http://localhost:8081..

## API Configuration

The project uses three external APIs:

- **Geonames API** for geographical data (e.g., coordinates of the destination).
- **Weatherbit API** for current and future weather information.
- **Pixabay API** for fetching images relevant to the destination.

### Setting Up Environment Variables

1. **Create an `.env` file** in the root directory.

2. **Add the following API keys** to the `.env` file:

```env
GEONAMES_API_KEY=your_geonames_username
WEATHERBIT_API_KEY=your_weatherbit_api_key
PIXABAY_API_KEY=your_pixabay_api_key




### 5. **Running Webpack and Troubleshooting**

## Running Webpack

### Development Mode
To bundle your code in development mode with hot reloading, run:

```bash
npx webpack --config webpack.dev.js

PowerShell Execution Policy Issue
If you encounter an error when running Webpack on PowerShell, follow these steps:

1- Open PowerShell as Administrator.
2- Run:
```bash
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
Confirm with Y when prompted.

Production Build:
To bundle your application for production:
```bash
   npx webpack --config webpack.prod.js


## Scripts

- `npm run build`: Builds the application for production using Webpack.
- `npm start`: Runs the application in development mode with hot-reloading.
- `npm run test`: Runs tests using Jest.


## Testing

The project uses **Jest** and **Supertest** to test both the client and server functionality.

To run all the test cases:
```bash
npm run test

`````

This command will execute all tests, including those defined in src/**tests**/ and src/server/server.test.js.

## Project Structure

├── src/
├──── client/
│ │ ├── assets/
│ │ │ ├── media/
│ │ │ ├──────── 1-final-project.jpg
│ │ │ ├── styles/
│ │ │ ├──────── main.scss
│ │ │ ├──────── \_base.scss
│ │ │ ├──────── \_layout.scss
│ │ │ ├──────── \_components.scss
│ │ │ ├──────── \_variables.scss
│ │ ├── js/
│ │ │ ├──────── app.js
│ │ │ ├──────── saveTrip.js
│ │ │ ├──────── deleteTrip.js
│ │ │ ├──────── displayTrip.js
│ │ │ ├──────── dateUtils.js
│ │ │ ├──────── inputValidation.js
│ │ └── views/
│ │ │ ├──────── index.html
│ │ └── tests/
│ │ │ ├──────── dateUtils.test.js
│ │ │ ├──────── inputValidation.test.js
│ │ └── index.js
│ │ └── .env.template
├──── server/
│ └── server/
├──── webpack.dev.js
├──── webpack.prod.js
├──── webpack.common.js
├──── webpack.config.js
├──── babel.config.json
├──── package.json
├──── .gitignore
└── .env

## Service Workers

This app includes service workers to support offline functionality and improve performance. The service worker is registered when the app is built and served in production mode.
