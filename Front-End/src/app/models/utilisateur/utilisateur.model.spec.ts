import { Utilisateur } from './utilisateur.model';

describe('Utilisateur Model', () => {
  it('should create a valid Utilisateur object', () => {
    const utilisateur: Utilisateur = {
      id: 1,
      email: 'test@example.com',
      nomComplet: 'John Doe',
      profession: 'Developer',
      numTel: '1234567890',
      signature: 'JohnDoeSignature',
      role: 'Admin',
      laboratoireId: 2
    };

    expect(utilisateur.id).toBe(1);
    expect(utilisateur.email).toBe('test@example.com');
    expect(utilisateur.nomComplet).toBe('John Doe');
    expect(utilisateur.profession).toBe('Developer');
    expect(utilisateur.numTel).toBe('1234567890');
    expect(utilisateur.signature).toBe('JohnDoeSignature');
    expect(utilisateur.role).toBe('Admin');
    expect(utilisateur.laboratoireId).toBe(2);
  });

  it('should handle missing optional properties', () => {
    const utilisateur: Partial<Utilisateur> = {
      email: 'test2@example.com',
      nomComplet: 'Jane Doe',
      profession: 'Tester',
      numTel: '0987654321',
      signature: 'JaneDoeSignature',
      role: 'User'
    };

    expect(utilisateur.email).toBe('test2@example.com');
    expect(utilisateur.nomComplet).toBe('Jane Doe');
    expect(utilisateur.profession).toBe('Tester');
    expect(utilisateur.numTel).toBe('0987654321');
    expect(utilisateur.signature).toBe('JaneDoeSignature');
    expect(utilisateur.role).toBe('User');
    expect(utilisateur.id).toBeUndefined();
    expect(utilisateur.laboratoireId).toBeUndefined();
  });
});
