// geolocation.js — Browser geolocation helper

/**
 * Get the user's current position and pass coordinates to a callback.
 * @param {function(lat: number, lon: number): void} onSuccess
 * @param {function(string): void} [onError]
 */
function getUserLocation(onSuccess, onError) {
    if (!navigator.geolocation) {
        onError?.('Geolocation is not supported by this browser.');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        position => onSuccess(position.coords.latitude, position.coords.longitude),
        error => {
            const messages = {
                [error.PERMISSION_DENIED]: 'User denied the request for Geolocation.',
                [error.POSITION_UNAVAILABLE]: 'Location information is unavailable.',
                [error.TIMEOUT]: 'The request to get user location timed out.',
            };
            onError?.(messages[error.code] ?? 'An unknown error occurred.');
        }
    );
}

export { getUserLocation };
