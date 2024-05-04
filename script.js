document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherInfo = document.getElementById('weather-info');
    const API_KEY = 'ac1ad3fcb8093e69a64da62bcc49bd59'; // Replace with your OpenWeatherMap API key

    searchBtn.addEventListener('click', () => {
        const cityName = searchInput.value.trim();
        if (cityName !== '') {
            getWeatherData(cityName);
        } else {
            alert('Please enter a city name');
        }
    });

    async function getWeatherData(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data. Please try again later.');
        }

        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        weatherInfo.innerHTML = `<p>${error.message}</p>`;
    }
    }
    function displayWeatherData(data) {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius
        const weatherDescription = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        const weatherHTML = `
            <h2>${cityName}</h2>
            <p>Temperatura: ${temperature}°C</p>
            <p>Weather: ${weatherDescription}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;
        weatherInfo.innerHTML = weatherHTML;
    }
});

