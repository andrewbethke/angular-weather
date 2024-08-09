import { Component, ElementRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { ForecastErrorComponent } from '../forecast-error/forecast-error.component';
import { ForecastRetrieverService } from '../forecast-service/forecast-retriever.service';
import { Observable } from 'rxjs';
import { NWSForecast, NWSLocation } from '../forecast-service/forecast.classes';
import { ForecastCardComponent } from '../forecast-card/forecast-card.component';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [ForecastErrorComponent, ForecastCardComponent, NgFor, NgIf],
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

  constructor(forecastRetriever: ForecastRetrieverService, element: ElementRef, @Inject(PLATFORM_ID) platform: Object) {
    this.forecastRetriever = forecastRetriever;
    this.element = element;
    // We can only use navigator on the client, so we need to check that this is running on the client.
    if (isPlatformBrowser(platform)){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.loadForecast.bind(this), this.handleGeolocationError.bind(this));
      } else {
        this.error = "Your browser does not support geolocation, which is required for this application. Try a more modern browser.";
      }
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
    locationRequest.subscribe(
      {
        // If getting the forecast URL is successful, all we need to do here is set up error handling for getting the forecast being unsucessful.
        next: response => {
          this.forecastRetriever.retrieveForecast(response).subscribe(
            {
              error: () => {
                this.error = "Your location is covered by the National Weather Service and should have a forecast available, but it could not be retrieved. Please try again later.";
              }
            }
          );
        },
        // If the forecast URL could not be retrieved for the location, it's probably outside the US and the user should get an error message explaining that.
        error: () => {
          this.error = "The forecast could not be retrieved for this location. If you're outside the United States, that is to be expected, as the National Weather Service does not provide worldwide forecasts. If you're in the United States, please try again later.";
        }
      }
    );
  }
}