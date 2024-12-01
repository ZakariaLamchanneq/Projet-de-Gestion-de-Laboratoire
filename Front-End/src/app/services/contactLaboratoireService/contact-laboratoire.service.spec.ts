import { TestBed } from '@angular/core/testing';

import { ContactLaboratoireService } from './contact-laboratoire.service';

describe('ContactLaboratoireService', () => {
  let service: ContactLaboratoireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactLaboratoireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
