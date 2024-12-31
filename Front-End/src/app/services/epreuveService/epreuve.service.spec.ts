import { TestBed } from '@angular/core/testing';

import { EpreuveService } from './epreuve.service';

describe('EpreuveService', () => {
  let service: EpreuveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpreuveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
