import { TestBed, inject } from '@angular/core/testing';

import { CommandeAdminService } from './commande-admin.service';

describe('CommandeAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandeAdminService]
    });
  });

  it('should be created', inject([CommandeAdminService], (service: CommandeAdminService) => {
    expect(service).toBeTruthy();
  }));
});
