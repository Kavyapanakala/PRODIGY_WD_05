const apiKey = "https://openweathermap.org/api"; // 🔑 Replace with your OpenWeatherMap API key

// Fetch weather data
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById("weatherInfo").innerHTML =
      `<p style="color:red;">${error.message}</p>`;
  }
}

// Display weather info
function displayWeather(data) {
  const weatherInfo = document.getElementById("weatherInfo");
  const { name, main, weather, wind } = data;

  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <img class="icon" src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
    <p><strong>Condition:</strong> ${weather[0].main} (${weather[0].description})</p>
    <p><strong>Temperature:</strong> ${main.temp} °C</p>
    <p><strong>Feels Like:</strong> ${main.feels_like} °C</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
  `;
}
