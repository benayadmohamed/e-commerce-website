import { TestBed, inject } from '@angular/core/testing';

import { VilleService } from './ville.service';

describe('VilleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VilleService]
    });
  });

  it('should be created', inject([VilleService], (service: VilleService) => {
    expect(service).toBeTruthy();
  }));
});
