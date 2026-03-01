// ui.js

// Function to update UI elements
function updateUIElement(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = value;
    }
}

// Function to render weather cards
function renderWeatherCard(weatherData) {
    const card = document.createElement('div');
    card.className = 'weather-card';
    card.innerHTML = `
        <h3>${weatherData.city}</h3>
        <p>Temperature: ${weatherData.temperature}°${weatherData.unit}</p>
        <p>Condition: ${weatherData.condition}</p>
    `;
    document.querySelector('#weather-container').appendChild(card);
}

// Function to handle theme changes
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
}

// Function to display data based on temperature units
function displayTemperature(temperature, unit) {
    return unit === 'C' ? temperature + ' °C' : (temperature * 9/5 + 32).toFixed(2) + ' °F';
}

// Function to format timestamp
function formatTimestamp(timestamp, format) {
    const date = new Date(timestamp);
    // Assuming format is 'YYYY-MM-DD HH:MM:SS'
    return date.toISOString().slice(0, 19).replace('T', ' ');
}