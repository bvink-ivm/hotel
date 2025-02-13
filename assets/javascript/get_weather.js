function mpsToBeaufort(speedMS) {
    if (speedMS < 0.3) return 0;
    if (speedMS < 1.6) return 1;
    if (speedMS < 3.4) return 2;
    if (speedMS < 5.5) return 3;
    if (speedMS < 8.0) return 4;
    if (speedMS < 10.8) return 5;
    if (speedMS < 13.9) return 6;
    if (speedMS < 17.2) return 7;
    if (speedMS < 20.8) return 8;
    if (speedMS < 24.5) return 9;
    if (speedMS < 28.5) return 10;
    if (speedMS < 32.7) return 11;
    return 12;
}

function degToCompass(degrees) {
    const directions = [
        "N", "NNO", "NO", "ONO", "O", "OZO", "ZO", "ZZO",
        "Z", "ZZW", "ZW", "WZW", "W", "WNW", "NW", "NNW"
    ];

    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}

async function getWeather() {
    let apiKey = window.API_KEY;
    let city = "Alkmaar";
    let units = "metric";
    let lang = "nl";	
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const weather = data.weather[0].description;
        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        const windSpeed = data.wind.speed;
        const windBeaufort = mpsToBeaufort(windSpeed);
        const windDirection = data.wind.deg;
        const windDirectionText = degToCompass(windDirection);

        document.getElementById("weatherText").innerText = `${weather}`
        document.getElementById("tempText").innerText= `${temp}`
        document.getElementById("feelsLikeText").innerText= `${feelsLike}`
        document.getElementById("windSpeedText").innerText= `${windBeaufort}`
        document.getElementById("windDirectionText").innerText= `${windDirectionText}`
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

document.addEventListener("DOMContentLoaded", getWeather());
