import { TestBed, inject } from '@angular/core/testing';

import { SousCategorieService } from './sous-categorie.service';

describe('SousCategorieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SousCategorieService]
    });
  });

  it('should be created', inject([SousCategorieService], (service: SousCategorieService) => {
    expect(service).toBeTruthy();
  }));
});
