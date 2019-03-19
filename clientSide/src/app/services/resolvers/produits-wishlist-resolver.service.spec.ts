import { TestBed, inject } from '@angular/core/testing';

import { ProduitsWishlistResolverService } from './produits-wishlist-resolver.service';

describe('ProduitsWishlistResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitsWishlistResolverService]
    });
  });

  it('should be created', inject([ProduitsWishlistResolverService], (service: ProduitsWishlistResolverService) => {
    expect(service).toBeTruthy();
  }));
});
