// ui.js — UI rendering helpers

// Safe DOM element factory — never uses innerHTML for untrusted content
function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function updateUIElement(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = value;
    }
}

function renderWeatherCard(weatherData) {
    const card = el('div', 'weather-card');
    card.append(
        el('h3', null, weatherData.city),
        el('p', null, `Temperature: ${weatherData.temperature}°${weatherData.unit}`),
        el('p', null, `Condition: ${weatherData.condition}`),
    );
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

export { el, updateUIElement, renderWeatherCard, toggleTheme, displayTemperature, formatTimestamp };
