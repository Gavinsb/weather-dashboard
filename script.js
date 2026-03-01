import { fetchCurrentWeather, fetchWeatherForecast, fetchWeatherByCoords } from './src/js/weather.js';

const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('#search-btn');
const weatherDisplay = document.querySelector('#weather-display');
const forecastCards = document.querySelector('#forecast-cards');
const unitsToggle = document.querySelector('#units-toggle');

function getUnits() {
    return unitsToggle.checked ? 'metric' : 'imperial';
}

function displayWeather(data) {
    if (data.cod !== 200) {
        weatherDisplay.innerHTML = `<p class="error">Error: ${data.message}</p>`;
        return;
    }
    const { name, main, weather, wind } = data;
    const unit = unitsToggle.checked ? 'C' : 'F';
    weatherDisplay.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°${unit}</p>
        <p>Feels like: ${main.feels_like}°${unit}</p>
        <p>Condition: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    if (data.cod !== '200') return;
    forecastCards.innerHTML = '';
    // Show one reading per day (every 8th entry ≈ 24 h intervals)
    data.list.filter((_, i) => i % 8 === 0).forEach(item => {
        const card = document.createElement('div');
        card.className = 'weather-card';
        const unit = unitsToggle.checked ? 'C' : 'F';
        card.innerHTML = `
            <h3>${new Date(item.dt * 1000).toLocaleDateString()}</h3>
            <p>${item.main.temp}°${unit}</p>
            <p>${item.weather[0].description}</p>
        `;
        forecastCards.appendChild(card);
    });
}

async function search(location) {
    if (!location.trim()) return;
    const units = getUnits();
    try {
        const [current, forecast] = await Promise.all([
            fetchCurrentWeather(location, units),
            fetchWeatherForecast(location, units),
        ]);
        displayWeather(current);
        displayForecast(forecast);
    } catch {
        weatherDisplay.innerHTML = `<p class="error">Failed to fetch weather data. Please try again.</p>`;
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
                displayWeather(data);
                searchInput.value = data.name;
                const forecast = await fetchWeatherForecast(data.name, getUnits());
                displayForecast(forecast);
            } catch {
                // Silent fallback — user can search manually
            }
        },
        () => {} // User denied geolocation or it is unavailable
    );
}
