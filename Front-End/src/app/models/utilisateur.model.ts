import { Laboratoire } from "./laboratoire.model";

export interface Utilisateur {
  id?: number;
  email: string;
  nomComplet: string;
  profession: string;
  numTel: string;
  signature: string;
  role: string;
  laboratoireId?: number;
}
