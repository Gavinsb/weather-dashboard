// JavaScript for Weather Dashboard

// API key and base URL
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

// DOM elements
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const weatherDisplay = document.querySelector('#weather-display');
const unitsToggle = document.querySelector('#units-toggle');

// Function to fetch weather data
async function fetchWeatherData(location, units) {
    const response = await fetch(`${BASE_URL}weather?q=${location}&units=${units}&appid=${API_KEY}`);
    return response.json();
}

// Function to display weather data
function displayWeather(data) {
    if (data.cod !== 200) {
        alert('Error: ' + data.message);
        return;
    }
    const { name, main, weather, wind } = data;
    weatherDisplay.innerHTML = `<h2>${name}</h2>\n` +
                              `<p>Temperature: ${main.temp}°${unitsToggle.checked ? 'C' : 'F'}</p>\n` +
                              `<p>Condition: ${weather[0].description}</p>\n` +
                              `<p>Wind Speed: ${wind.speed} m/s</p>`;
}

// Event listeners
searchButton.addEventListener('click', async () => {
    const location = searchInput.value;
    const units = unitsToggle.checked ? 'metric' : 'imperial';
    const weatherData = await fetchWeatherData(location, units);
    displayWeather(weatherData);
});

// Geolocation feature
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(`${BASE_URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
        const data = await response.json();
        displayWeather(data);
    });
}

// Autocomplete feature for search input
const autocompleteList = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami']; // Example locations
searchInput.addEventListener('input', () => {
    const value = searchInput.value;
    const suggestions = autocompleteList.filter(location => location.toLowerCase().startsWith(value.toLowerCase()));
    // Show suggestions
});

// Unit toggle functionality
unitsToggle.addEventListener('change', () => {
    const currentLocation = searchInput.value;
    if (currentLocation) {
        const units = unitsToggle.checked ? 'metric' : 'imperial';
        fetchWeatherData(currentLocation, units).then(displayWeather);
    }
});