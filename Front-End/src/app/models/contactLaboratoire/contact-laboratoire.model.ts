export interface ContactLaboratoire {
  id: number;
  numTel: number;
  fax: number;
  email: string;
  fkIdLaboratoire: number;
  fkIdAdresse: number;
}
