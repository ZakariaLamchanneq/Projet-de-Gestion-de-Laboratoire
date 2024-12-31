import { TestBed } from '@angular/core/testing';

import { TestEpreuveService } from './test-epreuve.service';

describe('TestEpreuveService', () => {
  let service: TestEpreuveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestEpreuveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
