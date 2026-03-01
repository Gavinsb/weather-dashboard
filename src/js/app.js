// app.js — Application initialization (module entry point for src/js)
// The primary entry point is script.js in the project root.

function setupEventListeners() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            if (searchInput.value.trim()) {
                searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            }
        });
    }
}

function initApp() {
    setupEventListeners();
}

export { initApp };
