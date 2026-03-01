# Weather Dashboard

## Overview
The Weather Dashboard is a web application that provides users with real-time weather data for various locations around the globe. Users can search for their favorite cities and get updated weather information, including temperature, humidity, wind speed, and forecasts.

## Features
- Real-time weather updates
- Search by city or location
- Display of temperature, humidity, wind speed, and forecasts
- User-friendly interface

## Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Gavinsb/weather-dashboard.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd weather-dashboard
   ```
3. **Install dependencies:**
   Make sure you have Node.js installed. Run:
   ```bash
   npm install
   ```
4. **Start the application:**
   ```bash
   npm start
   ```
5. Open your browser and go to `http://localhost:3000` to view the dashboard.

## API Configuration
To fetch weather data, you will need an API key from a weather service provider such as OpenWeatherMap.
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api) and obtain your API key.
2. In the project, create a `.env` file in the root directory and add your API key:
   ```plaintext
   API_KEY=your_api_key_here
   ```

## Usage Guide
1. Enter the name of the city you want to check the weather for in the search bar.
2. Click on the search button or press enter to get the weather information.
3. The current weather, along with humidity, wind speed, and forecast will be displayed on the screen.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request if you would like to contribute.

## License
This project is licensed under the MIT License.