import { TestBed } from '@angular/core/testing';

import { PatientService } from './patient.service';
import {provideHttpClient, withFetch} from '@angular/common/http';

describe('PatientServiceService', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch())]
    });
    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
