// Define the API URL
const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date={START_DATE}&end_date={END_DATE}&api_key=fMJH7EV5PRgJN7Pq9PzQAFEiFJcCJvNNeZVEVFAT';

// Handle the "Load Asteroid Info" button click
document.getElementById('loadAsteroids').addEventListener('click', function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (startDate && endDate) {
        fetchAsteroidData(startDate, endDate);
    } else {
        alert("Please select both start and end date!");
    }
});

async function fetchAsteroidData(startDate, endDate) {
    try {
        const url = apiUrl.replace("{START_DATE}", startDate).replace("{END_DATE}", endDate);
        const response = await fetch(url);
        const data = await response.json();

        // Get the asteroids data for the specified date range
        const asteroids = data.near_earth_objects;
        let asteroidDetails = '<h3>Asteroids Data:</h3>';
        asteroidDetails += '<div class="asteroid-info">';
        
        Object.keys(asteroids).forEach(date => {
            asteroids[date].forEach(asteroid => {
                asteroidDetails += `
                    <div class="asteroid-card">
                        <h3>${asteroid.name}</h3>
                        <p><strong>Size:</strong> ${asteroid.estimated_diameter.kilometers.estimated_diameter_max} km</p>
                        <p><strong>Close Approach:</strong> ${asteroid.close_approach_data[0].close_approach_date}</p>
                        <p><strong>Relative Velocity:</strong> ${asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</p>
                    </div>
                `;
            });
        });

        asteroidDetails += '</div>';
        document.getElementById('asteroidInfo').innerHTML = asteroidDetails;

    } catch (error) {
        console.error('Error fetching asteroid data:', error);
        document.getElementById('asteroidInfo').innerHTML = '<p>Failed to load asteroid data. Please try again later.</p>';
    }
}
