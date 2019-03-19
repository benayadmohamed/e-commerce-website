import { TestBed, inject } from '@angular/core/testing';

import { CheckoutResolverService } from './checkout-resolver.service';

describe('CheckoutResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckoutResolverService]
    });
  });

  it('should be created', inject([CheckoutResolverService], (service: CheckoutResolverService) => {
    expect(service).toBeTruthy();
  }));
});
