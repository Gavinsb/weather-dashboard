import { fetchWeatherData, fetchWeatherByCoords, wmoDescription, CityNotFoundError } from './src/js/weather.js';
import { el } from './src/js/ui.js';
import { getUserLocation } from './src/js/geolocation.js';

const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('#search-btn');
const weatherDisplay = document.querySelector('#weather-display');
const forecastCards = document.querySelector('#forecast-cards');
const unitsToggle = document.querySelector('#units-toggle');

// Last successfully resolved coordinates — reused on units change to skip re-geocoding.
let lastCoords = null; // { lat, lon, cityName }

function getUnits() {
    return unitsToggle.checked ? 'metric' : 'imperial';
}

function getUnitSymbol() {
    return unitsToggle.checked ? 'C' : 'F';
}

function displayWeather(data, cityName) {
    const { current } = data;
    const unit = getUnitSymbol();

    weatherDisplay.replaceChildren(
        el('h2', null, cityName ?? 'Current Location'),
        el('p', null, `Temperature: ${current.temperature_2m}°${unit}`),
        el('p', null, `Feels like: ${current.apparent_temperature}°${unit}`),
        el('p', null, `Condition: ${wmoDescription(current.weather_code)}`),
        el('p', null, `Humidity: ${current.relative_humidity_2m}%`),
        el('p', null, `Wind Speed: ${current.wind_speed_10m} m/s`),
    );
}

function displayForecast(data) {
    const { daily } = data;
    const unit = getUnitSymbol();

    const fragment = document.createDocumentFragment();
    daily.time.forEach((date, i) => {
        const card = el('div', 'weather-card');
        card.append(
            el('h3', null, new Date(date).toLocaleDateString()),
            el('p', null, `${daily.temperature_2m_max[i]}° / ${daily.temperature_2m_min[i]}°${unit}`),
            el('p', null, wmoDescription(daily.weather_code[i])),
        );
        fragment.appendChild(card);
    });

    forecastCards.replaceChildren(fragment);
}

function showError(message) {
    weatherDisplay.replaceChildren(el('p', 'error', message));
}

async function search(location) {
    const trimmed = location.trim();
    if (!trimmed) return;
    if (trimmed.length > 100) {
        showError('Search query is too long.');
        return;
    }
    const units = getUnits();
    try {
        const { weather, cityName, latitude, longitude } = await fetchWeatherData(trimmed, units);
        lastCoords = { lat: latitude, lon: longitude, cityName };
        displayWeather(weather, cityName);
        displayForecast(weather);
    } catch (err) {
        showError(err instanceof CityNotFoundError ? err.message : 'Failed to fetch weather data. Please try again.');
    }
}

async function refreshWithUnits() {
    const { lat, lon, cityName } = lastCoords;
    try {
        const weather = await fetchWeatherByCoords(lat, lon, getUnits());
        displayWeather(weather, cityName);
        displayForecast(weather);
    } catch {
        showError('Failed to fetch weather data. Please try again.');
    }
}

searchButton.addEventListener('click', () => search(searchInput.value));

searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') search(searchInput.value);
});

unitsToggle.addEventListener('change', () => {
    if (lastCoords) {
        refreshWithUnits();
    } else {
        const location = searchInput.value;
        if (location) search(location);
    }
});

getUserLocation(async (lat, lon) => {
    try {
        const data = await fetchWeatherByCoords(lat, lon, getUnits());
        displayWeather(data, null);
        displayForecast(data);
    } catch {
        // Silent fallback — user can search manually
    }
});
