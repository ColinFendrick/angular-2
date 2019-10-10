import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather';
import { WEATHER_COLORS } from '../constants/constants'; 

// Hacky workaround cause theres no ts definition
// file for Skycons out in the wild
// and I don't want my IDE to yell at me
declare var Skycons: any;

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
  icons = new Skycons();

  constructor(private service: WeatherService) {}

  ngOnInit():void {
    this.getCurrentLocation();
  }

  getCurrentLocation():void {
    this.service.getCurrentLocation()
      .subscribe(position => {
        this.pos = position;
        this.getCurrentWeather();
        this.getLocationName();
      },
        err => console.error(err));
  }

  getCurrentWeather():void {
    this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
      .subscribe(
        ({ currently }) => {
          this.weatherData.temp = currently.temperature;
          this.weatherData.summary = currently.summary;
          this.weatherData.wind = currently.windSpeed;
          this.weatherData.humidity = currently.humidity;
          this.weatherData.icon = currently.icon;
          this.setIcon();
        },
        err => console.error(err)
      );
  }

  getLocationName():void {
    this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
      .subscribe(
        ({ results }) => this.currentLocation = results[7].formatted_address,
        err => console.error(err)
      );
  }

  toggleUnits():void {
    this.toggleTempUnits();
    this.toggleSpeedUnits();
  }

  toggleTempUnits():void {
    if (this.currentTempUnit === 'fahrenheit') { this.currentTempUnit = 'celsius'; }
    else { this.currentTempUnit = 'fahrenheit'; }
  }

  toggleSpeedUnits():void {
    if (this.currentSpeedUnit === 'mph') { this.currentSpeedUnit = 'kph'; }
    else { this.currentSpeedUnit = 'mph'; }
  }

  setIcon():void {
    this.icons.add('icon', this.weatherData.icon);
    console.log(this.weatherData.icon)
    this.icons.play();
  }

  setStyles():Object {
    if (!this.weatherData.icon) {
      this.icons.color = WEATHER_COLORS.default.color;
      return WEATHER_COLORS.default;
    }
    this.icons.color = WEATHER_COLORS[this.weatherData.icon].color;
    return WEATHER_COLORS[this.weatherData.icon];
  }
}
