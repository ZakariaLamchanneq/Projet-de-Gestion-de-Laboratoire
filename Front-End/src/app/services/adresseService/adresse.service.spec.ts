import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdresseService } from './adresse.service';
import { Adresse } from '../../models/adresse/adresse.model';

describe('AdresseService', () => {
  let service: AdresseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdresseService]
    });
    service = TestBed.inject(AdresseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all addresses', () => {
    const mockAdresses: Adresse[] = [{ id: 1, numVoie: 123, nomVoie: 'Main Street', codePostal: 12345, ville: 'Sample City', commune: 'Sample Commune' }];

    service.getAllAdresses().subscribe(adresses => {
      expect(adresses).toEqual(mockAdresses);
    });

    const req = httpMock.expectOne('http://localhost:8222/api/adresses/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockAdresses);
  });

  it('should retrieve address by id', () => {
    const mockAdresse: Adresse = { id: 1, numVoie: 123, nomVoie: 'Main Street', codePostal: 12345, ville: 'Sample City', commune: 'Sample Commune' };

    service.getAdresseById(1).subscribe(adresse => {
      expect(adresse).toEqual(mockAdresse);
    });

    const req = httpMock.expectOne('http://localhost:8222/api/adresses/find/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockAdresse);
  });

  it('should create a new address', () => {
    const mockAdresse: Adresse = { id: 1, numVoie: 123, nomVoie: 'Main Street', codePostal: 12345, ville: 'Sample City', commune: 'Sample Commune' };

    service.createAdresse(mockAdresse).subscribe(adresse => {
      expect(adresse).toEqual(mockAdresse);
    });

    const req = httpMock.expectOne('http://localhost:8222/api/adresses/add');
    expect(req.request.method).toBe('POST');
    req.flush(mockAdresse);
  });

  it('should update an address', () => {
    const mockAdresse: Adresse = { id: 1, numVoie: 123, nomVoie: 'Main Street', codePostal: 12345, ville: 'Sample City', commune: 'Sample Commune' };

    service.updateAdresse(1, mockAdresse).subscribe(adresse => {
      expect(adresse).toEqual(mockAdresse);
    });

    const req = httpMock.expectOne('http://localhost:8222/api/adresses/edit/1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockAdresse);
  });

  it('should delete an address', () => {
    service.deleteAdresse(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:8222/api/adresses/delete/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
