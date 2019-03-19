import { TestBed, inject } from '@angular/core/testing';

import { ProduitsCategorieResolverService } from './produits-categorie-resolver.service';

describe('ProduitsCategorieResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitsCategorieResolverService]
    });
  });

  it('should be created', inject([ProduitsCategorieResolverService], (service: ProduitsCategorieResolverService) => {
    expect(service).toBeTruthy();
  }));
});
