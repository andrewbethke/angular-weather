import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastErrorComponent } from './forecast-error.component';

describe('ForecastErrorComponent', () => {
  let component: ForecastErrorComponent;
  let fixture: ComponentFixture<ForecastErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForecastErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
