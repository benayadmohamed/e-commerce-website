import { TestBed, inject } from '@angular/core/testing';

import { ActualiteUpdateService } from './actualite-update.service';

describe('ActualiteUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActualiteUpdateService]
    });
  });

  it('should be created', inject([ActualiteUpdateService], (service: ActualiteUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
