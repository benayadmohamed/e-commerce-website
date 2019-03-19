import { TestBed, inject } from '@angular/core/testing';

import { TypeLivraisonService } from './type-livraison.service';

describe('TypeLivraisonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeLivraisonService]
    });
  });

  it('should be created', inject([TypeLivraisonService], (service: TypeLivraisonService) => {
    expect(service).toBeTruthy();
  }));
});
