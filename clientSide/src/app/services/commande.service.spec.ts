import { TestBed, inject } from '@angular/core/testing';

import { CommandeService } from './commande.service';

describe('CommandeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandeService]
    });
  });

  it('should be created', inject([CommandeService], (service: CommandeService) => {
    expect(service).toBeTruthy();
  }));
});
