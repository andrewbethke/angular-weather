import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { ForecastRetrieverService } from '../forecast-retriever.service';
import { Observable } from 'rxjs';
import { NWSLocation } from '../forecast.classes';
import { ForecastCardComponent } from '../forecast-card/forecast-card.component';

@Component({
  selector: 'app-forecast-loader',
  standalone: true,
  imports: [],
  template: ""
})
export class ForecastLoaderComponent {
  forecastRetriever: ForecastRetrieverService;
  viewContainer: ViewContainerRef;
  
  constructor(forecastRetriever: ForecastRetrieverService, viewContainer: ViewContainerRef) { 
    this.forecastRetriever = forecastRetriever;
    this.viewContainer = viewContainer;
  }

  loadForecast(location: GeolocationPosition){
    let locationRequest: Observable<NWSLocation> = this.forecastRetriever.retrieveForecastUrl(location.coords.latitude, location.coords.longitude);
    locationRequest.subscribe(response => {
      this.forecastRetriever.retrieveForecast(response).subscribe(() =>
        this.forecastRetriever.forecast.properties.periods.forEach((period) => {
          let card: ComponentRef<ForecastCardComponent> = this.viewContainer.createComponent(ForecastCardComponent, {});
          card.instance.fillPeriod(period);
        })
      );
    });
  }
}
