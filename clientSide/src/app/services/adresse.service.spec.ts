import { TestBed, inject } from '@angular/core/testing';

import { AdresseService } from './adresse.service';

describe('AdresseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdresseService]
    });
  });

  it('should be created', inject([AdresseService], (service: AdresseService) => {
    expect(service).toBeTruthy();
  }));
});
