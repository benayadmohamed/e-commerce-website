import { TestBed, inject } from '@angular/core/testing';

import { TypeLivraisonResolverService } from './type-livraison-resolver.service';

describe('TypeLivraisonResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeLivraisonResolverService]
    });
  });

  it('should be created', inject([TypeLivraisonResolverService], (service: TypeLivraisonResolverService) => {
    expect(service).toBeTruthy();
  }));
});
