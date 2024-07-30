import { Component, Input } from '@angular/core';
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
  @Input() period: NWSForecastPeriod = new NWSForecastPeriod();
}
