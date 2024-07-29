import { Component, Input } from '@angular/core';
import { ForecastRetrieverService } from '../forecast-retriever.service';
import { NWSForecastPeriod } from '../forecast.classes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.scss'
})
export class ForecastCardComponent {
  forecastRetriever: ForecastRetrieverService;
  name: string = "";
  forecastText: string = "";
  day: boolean = true;

  constructor(forecastRetriever: ForecastRetrieverService){
    this.forecastRetriever = forecastRetriever;
  }

  fillPeriod(period: NWSForecastPeriod){
    this.name = period.name;
    this.forecastText = period.detailedForecast;
    this.day = period.isDaytime;
  }
}
