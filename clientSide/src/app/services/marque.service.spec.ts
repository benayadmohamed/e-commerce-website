import { TestBed, inject } from '@angular/core/testing';

import { MarqueService } from './marque.service';

describe('MarqueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarqueService]
    });
  });

  it('should be created', inject([MarqueService], (service: MarqueService) => {
    expect(service).toBeTruthy();
  }));
});
