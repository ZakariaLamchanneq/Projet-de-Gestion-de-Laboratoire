import { TestBed } from '@angular/core/testing';

import { UtilisateurService } from './utilisateur.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('UtilisateurService', () => {
  let service: UtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilisateurService, provideHttpClient(withFetch())]
    });
    service = TestBed.inject(UtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
