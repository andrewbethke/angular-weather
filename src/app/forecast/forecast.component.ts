import { Component, ElementRef, HostListener } from '@angular/core';
import { ForecastErrorComponent } from './forecast-error/forecast-error.component';
import { ForecastRetrieverService } from './forecast-retriever.service';
import { Observable } from 'rxjs';
import { NWSForecast, NWSLocation } from './forecast.classes';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [ForecastErrorComponent, ForecastCardComponent, NgFor],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent {
  forecastRetriever: ForecastRetrieverService;
  element: ElementRef;
  
  error: string = "";
  forecast: NWSForecast = new NWSForecast();

  @HostListener("wheel", ["$event"]) onScroll(event: WheelEvent) {
    this.element.nativeElement.children[0].scrollBy(event.deltaY, 0);
  }

  constructor(forecastRetriever: ForecastRetrieverService, element: ElementRef) {
    this.forecastRetriever = forecastRetriever;
    this.element = element;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.loadForecast.bind(this), this.handleGeolocationError.bind(this));
    } else {
      this.error = "Your browser does not support geolocation, which is required for this application. Try a more modern browser.";
    }
  }

  handleGeolocationError(err: GeolocationPositionError) {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        this.error = "You denied the geolocation request! Please allow this website to retrieve your location.";
        break;
      case err.POSITION_UNAVAILABLE:
        this.error = "Location information is unavailable. Check your browser location settings.";
        break;
      case err.TIMEOUT:
        this.error = "The request to get your location timed out. Please try again.";
        break;
      default:
        this.error = "An unknown error occurred. Please try again.";
        break;
    }
  }

  loadForecast(location: GeolocationPosition) {
    let locationRequest: Observable<NWSLocation> = this.forecastRetriever.retrieveForecastUrl(location.coords.latitude, location.coords.longitude);
    locationRequest.subscribe(response => {
      this.forecastRetriever.retrieveForecast(response).subscribe((response) => {
        this.forecast = response;
      });
    });
  }
}