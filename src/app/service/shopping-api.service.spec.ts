import { TestBed, inject } from '@angular/core/testing';

import { ShoppingApiService } from './shopping-api.service';

describe('ShoppingApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingApiService]
    });
  });

  it('should be created', inject([ShoppingApiService], (service: ShoppingApiService) => {
    expect(service).toBeTruthy();
  }));
});
