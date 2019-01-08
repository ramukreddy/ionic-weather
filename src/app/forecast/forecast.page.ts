
import { Component } from '@angular/core';

import { Forecast } from '../models/forecast';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})

export class ForecastPage {
  forecast: Forecast = [];

  constructor(public iconMap: IconMapService, private weatherService: WeatherService) {}

  ionViewDidEnter() {
    this.weatherService.forecast().subscribe(w=>this.forecast = w);
  }
}
