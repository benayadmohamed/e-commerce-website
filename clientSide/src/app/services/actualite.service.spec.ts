import { TestBed, inject } from '@angular/core/testing';

import { ActualiteService } from './actualite.service';

describe('ActualiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActualiteService]
    });
  });

  it('should be created', inject([ActualiteService], (service: ActualiteService) => {
    expect(service).toBeTruthy();
  }));
});
