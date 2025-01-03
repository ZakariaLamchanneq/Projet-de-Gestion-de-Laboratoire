import { TestBed } from '@angular/core/testing';

import { ContactLaboratoireService } from './contact-laboratoire.service';
import {provideHttpClient, withFetch} from '@angular/common/http';

describe('ContactLaboratoireService', () => {
  let service: ContactLaboratoireService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch())]
    });
    service = TestBed.inject(ContactLaboratoireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
