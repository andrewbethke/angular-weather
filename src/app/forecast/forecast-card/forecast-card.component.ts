import { Component, Input } from '@angular/core';
import { NWSForecastPeriod } from '../forecast-service/forecast.classes';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.scss'
})
export class ForecastCardComponent {
  @Input() period: NWSForecastPeriod = new NWSForecastPeriod();

  kmToMiles(km: number){
    return Math.round(0.6213711922 * km);
  }

  cToF(c: number) {
    return Math.round((c * (9 / 5)) + 32);
  }
}
