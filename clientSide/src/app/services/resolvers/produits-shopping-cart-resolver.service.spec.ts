import { TestBed, inject } from '@angular/core/testing';

import { ProduitsShoppingCartResolverService } from './produits-shopping-cart-resolver.service';

describe('ProduitsShoppingCartResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitsShoppingCartResolverService]
    });
  });

  it('should be created', inject([ProduitsShoppingCartResolverService], (service: ProduitsShoppingCartResolverService) => {
    expect(service).toBeTruthy();
  }));
});
