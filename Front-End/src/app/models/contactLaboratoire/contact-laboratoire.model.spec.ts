import { ContactLaboratoire } from './contact-laboratoire.model';

describe('ContactLaboratoire Model', () => {
  it('should create a valid ContactLaboratoire object', () => {
    const contactLaboratoire: ContactLaboratoire = {
      id: 1,
      numTel: 123456789,
      fax: 987654321,
      email: 'test@example.com',
      fkIdLaboratoire: 1,
      fkIdAdresse: 2
    };

    expect(contactLaboratoire.id).toBe(1);
    expect(contactLaboratoire.numTel).toBe(123456789);
    expect(contactLaboratoire.fax).toBe(987654321);
    expect(contactLaboratoire.email).toBe('test@example.com');
    expect(contactLaboratoire.fkIdLaboratoire).toBe(1);
    expect(contactLaboratoire.fkIdAdresse).toBe(2);
  });

  it('should handle missing optional properties', () => {
    const contactLaboratoire: Partial<ContactLaboratoire> = {
      id: 2,
      numTel: 123456789,
      email: 'test2@example.com'
    };

    expect(contactLaboratoire.id).toBe(2);
    expect(contactLaboratoire.numTel).toBe(123456789);
    expect(contactLaboratoire.email).toBe('test2@example.com');
    expect(contactLaboratoire.fax).toBeUndefined();
    expect(contactLaboratoire.fkIdLaboratoire).toBeUndefined();
    expect(contactLaboratoire.fkIdAdresse).toBeUndefined();
  });
});
