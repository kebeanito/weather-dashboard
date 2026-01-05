package com.example.weatherdashboard.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherController {

    // Test endpoint to make sure everything is working
    @GetMapping("/weather")
    public String getWeather(@RequestParam String city) {
        return "Weather data for " + city;
    }
}
