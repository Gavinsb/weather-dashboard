// weather.js — Open-Meteo API integration (no API key required)
// Docs: https://open-meteo.com/

const GEO_BASE = 'https://geocoding-api.open-meteo.com/v1';
const WEATHER_BASE = 'https://api.open-meteo.com/v1';

// WMO Weather interpretation codes: https://open-meteo.com/en/docs#weathervariables
const WMO_CODES = {
    0: 'Clear sky',
    1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Icy fog',
    51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
    61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
    71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Rain showers', 81: 'Heavy rain showers', 82: 'Violent rain showers',
    85: 'Snow showers', 86: 'Heavy snow showers',
    95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail',
};

async function _get(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
}

async function geocodeCity(city) {
    const data = await _get(
        `${GEO_BASE}/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    if (!data.results?.length) throw new Error(`City not found: "${city}"`);
    return data.results[0]; // { name, latitude, longitude, country, ... }
}

async function fetchWeatherByCoords(lat, lon, units = 'metric') {
    const tempUnit = units === 'metric' ? 'celsius' : 'fahrenheit';
    const url = `${WEATHER_BASE}/forecast` +
        `?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&temperature_unit=${tempUnit}&wind_speed_unit=ms&forecast_days=5&timezone=auto`;
    return _get(url);
}

async function fetchWeatherData(city, units = 'metric') {
    const geo = await geocodeCity(city);
    const data = await fetchWeatherByCoords(geo.latitude, geo.longitude, units);
    data._cityName = geo.name;
    data._country = geo.country;
    return data;
}

export { fetchWeatherData, fetchWeatherByCoords, WMO_CODES };
