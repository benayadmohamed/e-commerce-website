import { TestBed, inject } from '@angular/core/testing';

import { AfterLoginAdminService } from './after-login-admin.service';

describe('AfterLoginAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfterLoginAdminService]
    });
  });

  it('should be created', inject([AfterLoginAdminService], (service: AfterLoginAdminService) => {
    expect(service).toBeTruthy();
  }));
});
