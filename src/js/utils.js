// Utility functions for various purposes

/**
 * Format data to a readable format
 * @param {Object} data - The data to format
 * @returns {string} - Formatted data
 */
function formatData(data) {
    return JSON.stringify(data, null, 2);
}

/**
 * Convert temperature from Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} - Temperature in Fahrenheit
 */
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

/**
 * Convert temperature from Fahrenheit to Celsius
 * @param {number} fahrenheit - Temperature in Fahrenheit
 * @returns {number} - Temperature in Celsius
 */
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

/**
 * Format time to a human-readable format
 * @param {Date} date - The date object to format
 * @returns {string} - Formatted time string
 */
function formatTime(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

/**
 * Save data to local storage
 * @param {string} key - The key for the storage
 * @param {Object} value - The value to store
 */
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieve data from local storage
 * @param {string} key - The key to retrieve
 * @returns {Object|null} - The retrieved value or null
 */
function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
}

export {
    formatData,
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    formatTime,
    saveToLocalStorage,
    getFromLocalStorage
};