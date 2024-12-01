
export interface Patient{
  id?: number;
  nomComplet : string;
  dateNaissance : Date;
  lieuDeNaissance : string;
  sexe : string;
  typePieceIdentite : string;
  numPieceIdentite : number;
  adresse : string;
  numTel: number;
  email : string;
  visiblePour: string;
}
