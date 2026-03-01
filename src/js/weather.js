// weather.js — OpenWeatherMap API integration
// Replace 'YOUR_API_KEY_HERE' with your key from https://openweathermap.org/api

const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function _get(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
}

const fetchCurrentWeather = (city, units = 'metric') =>
    _get(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`);

const fetchWeatherForecast = (city, units = 'metric') =>
    _get(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`);

const fetchWeatherByCoords = (lat, lon, units = 'metric') =>
    _get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`);

const fetchWeatherAlerts = async (lat, lon) => {
    const data = await _get(`${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${API_KEY}`);
    return data.alerts || [];
};

const fetchAirQuality = (lat, lon) =>
    _get(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

export { fetchCurrentWeather, fetchWeatherForecast, fetchWeatherByCoords, fetchWeatherAlerts, fetchAirQuality };
