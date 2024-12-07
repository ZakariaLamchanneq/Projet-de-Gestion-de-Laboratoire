import { Adresse } from './adresse.model';

describe('Adresse Model', () => {
  it('should create a valid Adresse object', () => {
    const adresse: Adresse = {
      id: 1,
      numVoie: 123,
      nomVoie: 'Main Street',
      codePostal: 12345,
      ville: 'Sample City',
      commune: 'Sample Commune'
    };

    expect(adresse.id).toBe(1);
    expect(adresse.numVoie).toBe(123);
    expect(adresse.nomVoie).toBe('Main Street');
    expect(adresse.codePostal).toBe(12345);
    expect(adresse.ville).toBe('Sample City');
    expect(adresse.commune).toBe('Sample Commune');
  });

  it('should handle missing optional properties', () => {
    const adresse: Partial<Adresse> = {
      id: 2,
      numVoie: 456,
      nomVoie: 'Second Street'
    };

    expect(adresse.id).toBe(2);
    expect(adresse.numVoie).toBe(456);
    expect(adresse.nomVoie).toBe('Second Street');
    expect(adresse.codePostal).toBeUndefined();
    expect(adresse.ville).toBeUndefined();
    expect(adresse.commune).toBeUndefined();
  });
});
