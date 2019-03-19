import { TestBed, inject } from '@angular/core/testing';

import { AccountSettingResolverService } from './account-setting-resolver.service';

describe('AccountSettingResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountSettingResolverService]
    });
  });

  it('should be created', inject([AccountSettingResolverService], (service: AccountSettingResolverService) => {
    expect(service).toBeTruthy();
  }));
});
