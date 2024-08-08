import { TestBed } from '@angular/core/testing';

import { ForecastRetrieverService } from './forecast-retriever.service';

describe('ForecastRetrieverService', () => {
  let service: ForecastRetrieverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastRetrieverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
