import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Weather } from '../../models/weather';
import { Forecast } from '../../models/forecast';
import { UVIndex } from '../../models/uv-index';


import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private appId = '69f068bb8bf2bc3e061cb2b62c255c65';
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  private latitude = 38.96955;
  private longitude = -77.3861;
  constructor(private http: HttpClient) { }

  current(): Observable<Weather> {
    return this.http.get(
      `${this.baseUrl}/weather?lat=${this.latitude}&lon=${
      this.longitude
      }&appid=${this.appId}`)
      .pipe(map((res: any) => this.unpackWeather(res)));
  }

  private unpackWeather(res: any): Weather {
    return {
      temperature: res.main.temp,
      condition: res.weather[0].id,
      date: new Date(res.dt * 1000)
    };
  }

  forecast(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/forecast?lat=${this.latitude}&lon=${
      this.longitude
      }&appid=${this.appId}`)
      .pipe(map((res: any) => this.unpackForecast(res)));

  }

  private unpackForecast(res: any): Forecast {
    let currentDay: Array<Weather>;
    let prevDate: number;
    const forecast: Forecast = [];

    res.list.forEach(item => {
      const w = this.unpackWeather(item);
      if (w.date.getDate() !== prevDate) {
        prevDate = w.date.getDate();
        currentDay = [];
        forecast.push(currentDay);
      }
      currentDay.push(w);
    });

    return forecast;
  }
  uvIndex(): Observable<UVIndex> {
    return this.http.get(
      `${this.baseUrl}/uvi?lat=${this.latitude}&lon=${
      this.longitude
      }&appid=${this.appId}`)
      .pipe(map((res: any) => this.unpackUVIndex(res)));

  }

  private unpackUVIndex(res: any): UVIndex {
    return {
      value: res.value,
      riskLevel: this.riskLevel(res.value)
    };
  }

  private riskLevel(value: number): number {
    if (value < 3) {
      return 0;
    }
    if (value < 6) {
      return 1;
    }
    if (value < 8) {
      return 2;
    }
    if (value < 11) {
      return 3;
    }
    return 4;
  }
}
