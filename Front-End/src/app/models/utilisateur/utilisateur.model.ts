export interface Utilisateur {
  id?: number;
  email: string;
  nomComplet: string;
  profession: string;
  numTel: string;
  signature: string;
  role: string;
  laboratoireId?: number;
  isArchived?:Boolean;
}
