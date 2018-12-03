import { TestBed, inject } from '@angular/core/testing';

import { CartItemServiceService } from './cart-item-service.service';

describe('CartItemServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartItemServiceService]
    });
  });

  it('should be created', inject([CartItemServiceService], (service: CartItemServiceService) => {
    expect(service).toBeTruthy();
  }));
});
