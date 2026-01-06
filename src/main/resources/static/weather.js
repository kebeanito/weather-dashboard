// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// Load saved dark mode
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

// Clear input & result
function clearInput() {
    document.getElementById("cityInput").value = "";
    document.getElementById("weatherResult").innerHTML = "";
}

// Press Enter to search
function handleEnter(e) {
    if (e.key === "Enter") getWeather();
}

// Fetch weather data from Spring Boot backend
function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        document.getElementById("weatherResult").innerHTML =
            `<p class="text-red-600 dark:text-red-400 font-semibold">Please enter a city.</p>`;
        return;
    }

    // Show loading
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("weatherResult").innerHTML = "";

    fetch(`/weather?city=${city}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("loading").classList.add("hidden");

            if (data.cod !== 200) {
                document.getElementById("weatherResult").innerHTML =
                    `<p class="text-red-600 dark:text-red-400 font-semibold">City not found.</p>`;
                return;
            }

            // Render weather card
            const card = `
                <div class="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 fade-in">
                    <h2 class="text-2xl font-bold mb-2 text-center text-gray-800 dark:text-gray-100">
                        ${data.name}
                    </h2>

                    <div class="flex justify-center mb-4">
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="Weather Icon">
                    </div>

                    <p class="text-center text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                        ${data.main.temp}°C
                    </p>

                    <p class="text-center text-gray-600 dark:text-gray-300 mb-4 capitalize">
                        ${data.weather[0].description}
                    </p>

                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            <p class="text-gray-600 dark:text-gray-300">Min Temp</p>
                            <p class="font-semibold text-gray-900 dark:text-gray-100">${data.main.temp_min}°C</p>
                        </div>

                        <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            <p class="text-gray-600 dark:text-gray-300">Max Temp</p>
                            <p class="font-semibold text-gray-900 dark:text-gray-100">${data.main.temp_max}°C</p>
                        </div>

                        <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            <p class="text-gray-600 dark:text-gray-300">Humidity</p>
                            <p class="font-semibold text-gray-900 dark:text-gray-100">${data.main.humidity}%</p>
                        </div>

                        <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            <p class="text-gray-600 dark:text-gray-300">Wind Speed</p>
                            <p class="font-semibold text-gray-900 dark:text-gray-100">${data.wind.speed} m/s</p>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById("weatherResult").innerHTML = card;
        })
        .catch(() => {
            document.getElementById("loading").classList.add("hidden");
            document.getElementById("weatherResult").innerHTML =
                `<p class="text-red-600 dark:text-red-400 font-semibold">Error fetching weather data.</p>`;
        });
}
