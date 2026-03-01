// weather.js

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API Key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Function to fetch current weather
const fetchCurrentWeather = async (city) => {
    const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    return data;
};

// Function to fetch weather forecasts
const fetchWeatherForecast = async (city) => {
    const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    return data;
};

// Function to fetch weather alerts
const fetchWeatherAlerts = async (lat, lon) => {
    const response = await fetch(`${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${API_KEY}`);
    const data = await response.json();
    return data.alerts;
};

// Function to fetch air quality data
const fetchAirQuality = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const data = await response.json();
    return data;
};

// Example Usage:
// (async () => {
//     const weather = await fetchCurrentWeather('London');
//     console.log(weather);
//     const forecast = await fetchWeatherForecast('London');
//     console.log(forecast);
//     const alerts = await fetchWeatherAlerts(lat, lon);
//     console.log(alerts);
//     const airQuality = await fetchAirQuality(lat, lon);
//     console.log(airQuality);
// })();
