import { Patient } from './patient.model';

describe('Patient Model', () => {
  it('should create a valid Patient object', () => {
    const patient: Patient = {
      id: 1,
      nomComplet: 'John Doe',
      dateNaissance: new Date('1990-01-01'),
      lieuDeNaissance: 'City',
      sexe: 'Male',
      typePieceIdentite: 'Passport',
      numPieceIdentite: 123456789,
      adresse: '123 Main St',
      numTel: 1234567890,
      email: 'john.doe@example.com',
      visiblePour: 'Doctors'
    };

    expect(patient.id).toBe(1);
    expect(patient.nomComplet).toBe('John Doe');
    expect(patient.dateNaissance).toEqual(new Date('1990-01-01'));
    expect(patient.lieuDeNaissance).toBe('City');
    expect(patient.sexe).toBe('Male');
    expect(patient.typePieceIdentite).toBe('Passport');
    expect(patient.numPieceIdentite).toBe(123456789);
    expect(patient.adresse).toBe('123 Main St');
    expect(patient.numTel).toBe(1234567890);
    expect(patient.email).toBe('john.doe@example.com');
    expect(patient.visiblePour).toBe('Doctors');
  });

  it('should handle missing optional properties', () => {
    const patient: Partial<Patient> = {
      nomComplet: 'Jane Doe',
      dateNaissance: new Date('1992-02-02'),
      lieuDeNaissance: 'Town',
      sexe: 'Female'
    };

    expect(patient.nomComplet).toBe('Jane Doe');
    expect(patient.dateNaissance).toEqual(new Date('1992-02-02'));
    expect(patient.lieuDeNaissance).toBe('Town');
    expect(patient.sexe).toBe('Female');
    expect(patient.id).toBeUndefined();
    expect(patient.typePieceIdentite).toBeUndefined();
    expect(patient.numPieceIdentite).toBeUndefined();
    expect(patient.adresse).toBeUndefined();
    expect(patient.numTel).toBeUndefined();
    expect(patient.email).toBeUndefined();
    expect(patient.visiblePour).toBeUndefined();
  });
});
