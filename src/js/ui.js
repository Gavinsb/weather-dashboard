// ui.js — UI rendering helpers
import { celsiusToFahrenheit, formatTime } from './utils.js';

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
    return unit === 'C' ? temperature + ' °C' : celsiusToFahrenheit(temperature).toFixed(2) + ' °F';
}

function formatTimestamp(timestamp) {
    return formatTime(new Date(timestamp));
}

export { el, updateUIElement, renderWeatherCard, toggleTheme, displayTemperature, formatTimestamp };
