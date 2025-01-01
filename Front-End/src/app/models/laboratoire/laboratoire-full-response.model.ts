import { Utilisateur } from '../utilisateur/utilisateur.model';

export interface LaboratoireFullResponse {
  nom: string;
  logo: Blob;
  nrc: string;
  active: boolean;
  dateActivation: string;
  utilisateurs: Utilisateur[];
}
