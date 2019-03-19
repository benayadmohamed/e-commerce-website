import { TestBed, inject } from '@angular/core/testing';

import { ProduitService } from './produit.service';

describe('ProduitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitService]
    });
  });

  it('should be created', inject([ProduitService], (service: ProduitService) => {
    expect(service).toBeTruthy();
  }));
});
