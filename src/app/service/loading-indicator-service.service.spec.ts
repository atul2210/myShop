import { TestBed, inject } from '@angular/core/testing';

import { LoadingIndicatorServiceService } from './loading-indicator-service.service';

describe('LoadingIndicatorServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingIndicatorServiceService]
    });
  });

  it('should be created', inject([LoadingIndicatorServiceService], (service: LoadingIndicatorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
