import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast-error',
  standalone: true,
  imports: [],
  templateUrl: './forecast-error.component.html',
  styleUrl: './forecast-error.component.scss'
})
export class ForecastErrorComponent {
  @Input() messenger: Observable<string> = new Observable<string>();
  message: string = "";

  constructor() {
    this.messenger.subscribe((message) => {this.message = message});
  }
  
}
