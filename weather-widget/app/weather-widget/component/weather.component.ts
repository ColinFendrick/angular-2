import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather';

@Component({
  moduleId: module.id,
  selector: 'weather-widget',
  templateUrl: 'weather.component.html',
  styleUrls: ['weather.component.css'],
  providers: [WeatherService]
})
export class WeatherComponent implements OnInit {
  pos: Position;
  weatherData = new Weather(null, null, null, null, null);
  currentSpeedUnit = 'mph';
  currentTempUnit = 'fahrenheit';
  currentLocation = '';

  constructor(private service: WeatherService) {}

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.service.getCurrentLocation()
      .subscribe(position => {
        this.pos = position;
        this.getCurrentWeather();
        this.getLocationName();
      },
        err => console.error(err));
  }

  getCurrentWeather() {
    this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
      .subscribe(
        ({ currently }) => {
          this.weatherData.temp = currently.temperature;
          this.weatherData.summary = currently.summary;
          this.weatherData.wind = currently.windSpeed;
          this.weatherData.humidity = currently.humidity;
          this.weatherData.icon = currently.icon;
        },
        err => console.error(err)
      );
  }

  getLocationName() {
    this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
      .subscribe(
        ({ results }) => this.currentLocation = results[1].formatted_address,
        err => console.error(err)
      );
  }
}
