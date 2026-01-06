package com.example.weatherdashboard.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${WEATHER_API_KEY}")
    private String API_KEY;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getWeatherData(String city) {
        try {
            String url = "https://api.openweathermap.org/data/2.5/weather?q="
                    + city + "&appid=" + API_KEY + "&units=metric";

            // automatically performs the GET request
            return restTemplate.getForObject(url, String.class);

        } catch (Exception e) {
            e.printStackTrace();
            return "Error fetching weather data";
        }
    }
}
