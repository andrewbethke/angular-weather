import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NWSLocation, NWSForecast } from './forecast.classes';

@Injectable({
  providedIn: 'root'
})
export class ForecastRetrieverService {
  forecast: NWSForecast = new NWSForecast;

  constructor(private http: HttpClient) { }

  retrieveForecast(lat: number, long: number) {
    this.http.get<NWSLocation>("https://api.weather.gov/points/" + lat + "," + long).subscribe(response => {
      this.http.get<NWSForecast>(response.properties.forecast).subscribe(forecast => {
        this.forecast = forecast;
      })
    });
  }

  getForecastInfo() {
    return this.forecast;
  }
}
