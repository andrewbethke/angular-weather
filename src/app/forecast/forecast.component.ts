import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ForecastLoaderComponent } from './forecast-loader/forecast-loader.component';
import { ForecastErrorComponent } from './forecast-error/forecast-error.component';
import { ForecastRetrieverService } from './forecast-retriever.service';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [ForecastErrorComponent, ForecastLoaderComponent],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent {
  error: string = "";
  forecastRetriever: ForecastRetrieverService;
  viewContainer: ViewContainerRef;

  @ViewChild(ForecastLoaderComponent)
  loader!: ForecastLoaderComponent;

  constructor(forecastRetriever: ForecastRetrieverService, viewContainer: ViewContainerRef) {
    this.forecastRetriever = forecastRetriever;
    this.viewContainer = viewContainer;
  }

  ngAfterViewInit() {
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
    this.loader.loadForecast(location);
  }
}