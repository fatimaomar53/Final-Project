## README.md

# Travel App Project

This is a travel planning app that allows users to plan a trip by providing a destination and a date. The app integrates with several third-party APIs to fetch weather information, images, and geographical data related to the destination.

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

   ```bash
   git clone https://github.com/yourusername/travel-app.git
   cd travel-app
   ```

````

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add your API keys:

   ```env
   GEONAMES_API_KEY=your_geonames_username
   WEATHERBIT_API_KEY=your_weatherbit_api_key
   PIXABAY_API_KEY=your_pixabay_api_key
   ```

   Replace `your_geonames_username`, `your_weatherbit_api_key`, and `your_pixabay_api_key` with your actual API keys.

## Usage

To run the application locally:

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Start the development server**:

   ```bash
   npm start
   ```

3. Open your web browser and navigate to `http://localhost:8080`.

## API Configuration

The project requires API keys for the following services:

- **Geonames API**: Provides geographical data (e.g., coordinates) for the destination.
- **Weatherbit API**: Fetches current weather information based on the location.
- **Pixabay API**: Retrieves relevant images for the location.

### Setting Up Environment Variables

1. **Copy the `.env.template` file to `.env`**:

   ```bash
   cp .env.template .env
   (These adjustments will allow others to understand the necessary configuration without exposing any sensitive data.)


## Scripts

- `npm run build`: Builds the application for production using Webpack.
- `npm start`: Runs the application in development mode with hot-reloading.
- `npm run test`: Runs tests using Jest.

## Testing

The project uses **Jest** and **Supertest** for testing. To run the tests:

```bash
npm run test
```

This will run all the test cases defined in the `src/server/server.test.js` file and check the server endpoints.

- Node.js version v20.9.0 or above

To check your current Node.js version, run the following command:

```sh
node -v

- npm list to my project:
├── @babel/core@7.25.2
├── @babel/preset-env@7.25.4
├── axios@1.7.5
├── babel-loader@9.1.3
├── clean-webpack-plugin@4.0.0
├── cors@2.8.5
├── css-loader@7.1.2
├── dotenv-webpack@8.1.0
├── dotenv@16.4.5
├── express@4.19.2
├── html-loader@5.1.0
├── html-webpack-plugin@5.6.0
├── jest@29.7.0
├── mini-css-extract-plugin@2.9.1
├── node-fetch@3.3.2
├── html-loader@5.1.0
├── html-webpack-plugin@5.6.0
├── jest@29.7.0
├── mini-css-extract-plugin@2.9.1
├── node-fetch@3.3.2
├── jest@29.7.0
├── mini-css-extract-plugin@2.9.1
├── node-fetch@3.3.2
├── mini-css-extract-plugin@2.9.1
├── node-fetch@3.3.2
├── sass-loader@16.0.1
├── sass-loader@16.0.1
├── sass@1.77.8
├── sass@1.77.8
├── style-loader@4.0.0
├── supertest@7.0.0
├── webpack-cli@5.1.4
├── webpack-cli@5.1.4
├── webpack-dev-server@5.0.4
└── webpack@5.94.0
├── webpack-dev-server@5.0.4
└── webpack@5.94.0

## Project Structure

The project structure is organized as follows:

```
project-root/
│
├── client/
│   │   ├── js/
│   │   │   └── app.js
│   │   ├── styles/
│   │   │   └── style.scss
│   │   └── index.js
│   │   └──  .env
│   └── server/
│       ├── server.js
│       └── server.test.js
│   └── views/
│       ├── index.html
│       └── image
├── dist/
├── webpack.config.js
├── node_modules
├── package.json
└── .gitignore
```

## Built With

- **JavaScript**
- **Express** - Server framework
- **Webpack** - Module bundler
- **Sass** - CSS pre-processor
- **Jest** - Testing framework
- **Supertest** - HTTP assertions library

## Contributing

If you wish to contribute to the project, feel free to open a pull request or raise an issue.

## License

This project is licensed under the MIT License.

```

This README provides a comprehensive overview of your project, setup instructions, and usage guidelines. You can customize the "Contributing" and "License" sections further based on your needs.
```
````
