import { TestBed, inject } from '@angular/core/testing';

import { ProduitResolverService } from './produit-resolver.service';

describe('ProduitResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitResolverService]
    });
  });

  it('should be created', inject([ProduitResolverService], (service: ProduitResolverService) => {
    expect(service).toBeTruthy();
  }));
});
