// ui.js — UI rendering helpers

function updateUIElement(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = value;
    }
}

function renderWeatherCard(weatherData) {
    const card = document.createElement('div');
    card.className = 'weather-card';
    card.innerHTML = `
        <h3>${weatherData.city}</h3>
        <p>Temperature: ${weatherData.temperature}°${weatherData.unit}</p>
        <p>Condition: ${weatherData.condition}</p>
    `;
    document.querySelector('#weather-display').appendChild(card);
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

function displayTemperature(temperature, unit) {
    return unit === 'C' ? temperature + ' °C' : (temperature * 9 / 5 + 32).toFixed(2) + ' °F';
}

function formatTimestamp(timestamp) {
    return new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');
}

export { updateUIElement, renderWeatherCard, toggleTheme, displayTemperature, formatTimestamp };
