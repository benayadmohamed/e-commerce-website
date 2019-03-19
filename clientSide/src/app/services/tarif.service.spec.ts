import { TestBed, inject } from '@angular/core/testing';

import { TarifService } from './tarif.service';

describe('TarifService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TarifService]
    });
  });

  it('should be created', inject([TarifService], (service: TarifService) => {
    expect(service).toBeTruthy();
  }));
});
