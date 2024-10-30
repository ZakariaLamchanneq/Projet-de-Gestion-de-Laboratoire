import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { LaboratoireService } from './laboratoire.service';

describe('LaboratoireServiceService', () => {
  let service: LaboratoireService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LaboratoireService, provideHttpClient()]
    });
    service = TestBed.inject(LaboratoireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
