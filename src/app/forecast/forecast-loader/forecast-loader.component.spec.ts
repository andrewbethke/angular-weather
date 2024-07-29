import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastLoaderComponent } from './forecast-loader.component';

describe('ForecastLoaderComponent', () => {
  let component: ForecastLoaderComponent;
  let fixture: ComponentFixture<ForecastLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForecastLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
