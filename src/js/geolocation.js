// geolocation.js

/**
 * Get user location.  
 * 1. Ask for location permissions.  
 * 2. If granted, get current position.
 * 3. If denied, handle the response.  
 */
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log(`Latitude: ${lat}, Longitude: ${lon}`);
                // Additional functionality can be added here (e.g., fetch weather data)
            },
            function(error) {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        console.error('User denied the request for Geolocation.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error('Location information is unavailable.');
                        break;
                    case error.TIMEOUT:
                        console.error('The request to get user location timed out.');
                        break;
                    case error.UNKNOWN_ERROR:
                        console.error('An unknown error occurred.');
                        break;
                }
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Call the function to get user location
getUserLocation();