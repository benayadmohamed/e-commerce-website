import { TestBed, inject } from '@angular/core/testing';

import { CategorieService } from './categorie.service';

describe('CategorieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorieService]
    });
  });

  it('should be created', inject([CategorieService], (service: CategorieService) => {
    expect(service).toBeTruthy();
  }));
});
