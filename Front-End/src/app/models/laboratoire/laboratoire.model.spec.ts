import { Laboratoire } from './laboratoire.model';

describe('Laboratoire Model', () => {
  it('should create a valid Laboratoire object', () => {
    const laboratoire: Laboratoire = {
      id: 1,
      nom: 'Lab Name',
      logo: 'base64ImageData',
      nrc: 'NRC123',
      active: true,
      dateActivation: new Date('2023-01-01')
    };

    expect(laboratoire.id).toBe(1);
    expect(laboratoire.nom).toBe('Lab Name');
    expect(laboratoire.logo).toBe('base64ImageData');
    expect(laboratoire.nrc).toBe('NRC123');
    expect(laboratoire.active).toBe(true);
    expect(laboratoire.dateActivation).toEqual(new Date('2023-01-01'));
  });

  it('should handle missing optional properties', () => {
    const laboratoire: Partial<Laboratoire> = {
      id: 2,
      nom: 'Another Lab'
    };

    expect(laboratoire.id).toBe(2);
    expect(laboratoire.nom).toBe('Another Lab');
    expect(laboratoire.logo).toBeUndefined();
    expect(laboratoire.nrc).toBeUndefined();
    expect(laboratoire.active).toBeUndefined();
    expect(laboratoire.dateActivation).toBeUndefined();
  });
});
