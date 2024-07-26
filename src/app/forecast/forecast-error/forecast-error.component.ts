import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forecast-error',
  standalone: true,
  imports: [],
  templateUrl: './forecast-error.component.html',
  styleUrl: './forecast-error.component.scss'
})
export class ForecastErrorComponent {
  @Input() message: string = "";
}
