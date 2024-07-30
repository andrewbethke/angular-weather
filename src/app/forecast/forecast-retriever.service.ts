import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NWSLocation, NWSForecast } from './forecast.classes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastRetrieverService {
  forecast: NWSForecast = new NWSForecast;

  constructor(private http: HttpClient) { }

  retrieveForecastUrl(lat: number, long: number): Observable<NWSLocation> {
    return this.http.get<NWSLocation>("https://api.weather.gov/points/" + lat + "," + long);
  }

  retrieveForecast(location: NWSLocation): Observable<NWSForecast> {
    let request: Observable<NWSForecast> = this.http.get<NWSForecast>(location.properties.forecast, {"headers": new HttpHeaders({"Feature-Flags": ["forecast_temperature_qv", "forecast_wind_speed_qv"]})});
    request.subscribe(forecast => {
      this.forecast = forecast;
    });
    return request;
  }

  getForecastInfo() {
    return this.forecast;
  }

  getForecastPeriod(id: number) {
    return this.forecast.properties.periods[id];
  }
}
