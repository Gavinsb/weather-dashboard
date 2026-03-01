import { fetchWeatherData, fetchWeatherByCoords, WMO_CODES } from './src/js/weather.js';
import { el } from './src/js/ui.js';

const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('#search-btn');
const weatherDisplay = document.querySelector('#weather-display');
const forecastCards = document.querySelector('#forecast-cards');
const unitsToggle = document.querySelector('#units-toggle');

function getUnits() {
    return unitsToggle.checked ? 'metric' : 'imperial';
}

function getUnitSymbol() {
    return unitsToggle.checked ? 'C' : 'F';
}

function wmoDescription(code) {
    return WMO_CODES[code] ?? 'Unknown condition';
}

function displayWeather(data, cityName) {
    weatherDisplay.innerHTML = '';
    const { current } = data;
    const unit = getUnitSymbol();

    weatherDisplay.append(
        el('h2', null, cityName ?? 'Current Location'),
        el('p', null, `Temperature: ${current.temperature_2m}°${unit}`),
        el('p', null, `Feels like: ${current.apparent_temperature}°${unit}`),
        el('p', null, `Condition: ${wmoDescription(current.weather_code)}`),
        el('p', null, `Humidity: ${current.relative_humidity_2m}%`),
        el('p', null, `Wind Speed: ${current.wind_speed_10m} m/s`),
    );
}

function displayForecast(data) {
    forecastCards.innerHTML = '';
    const { daily } = data;
    const unit = getUnitSymbol();

    daily.time.forEach((date, i) => {
        const card = el('div', 'weather-card');
        card.append(
            el('h3', null, new Date(date).toLocaleDateString()),
            el('p', null, `${daily.temperature_2m_max[i]}° / ${daily.temperature_2m_min[i]}°${unit}`),
            el('p', null, wmoDescription(daily.weather_code[i])),
        );
        forecastCards.appendChild(card);
    });
}

function showError(message) {
    weatherDisplay.innerHTML = '';
    weatherDisplay.appendChild(el('p', 'error', message));
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
        const { weather, cityName } = await fetchWeatherData(trimmed, units);
        displayWeather(weather, cityName);
        displayForecast(weather);
    } catch (err) {
        const safe = err.message.startsWith('City not found')
            ? err.message
            : 'Failed to fetch weather data. Please try again.';
        showError(safe);
    }
}

searchButton.addEventListener('click', () => search(searchInput.value));

searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') search(searchInput.value);
});

unitsToggle.addEventListener('change', () => {
    const location = searchInput.value;
    if (location) search(location);
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        async position => {
            const { latitude, longitude } = position.coords;
            try {
                const data = await fetchWeatherByCoords(latitude, longitude, getUnits());
                displayWeather(data, null);
                displayForecast(data);
            } catch {
                // Silent fallback — user can search manually
            }
        },
        () => {} // User denied geolocation or it is unavailable
    );
}
