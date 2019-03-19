import { TestBed, inject } from '@angular/core/testing';

import { UserServicesService } from './user-services.service';

describe('UserServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserServicesService]
    });
  });

  it('should be created', inject([UserServicesService], (service: UserServicesService) => {
    expect(service).toBeTruthy();
  }));
});
