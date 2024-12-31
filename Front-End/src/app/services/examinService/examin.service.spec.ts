import { TestBed } from '@angular/core/testing';

import { ExaminService } from './examin.service';

describe('ExaminService', () => {
  let service: ExaminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExaminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
