import { TestBed, inject } from '@angular/core/testing';

import { MatiereService } from './matiere.service';

describe('MatiereService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatiereService]
    });
  });

  it('should be created', inject([MatiereService], (service: MatiereService) => {
    expect(service).toBeTruthy();
  }));
});
