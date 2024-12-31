
export interface EpreuveModel {

  id?:number;
  nom :string;
  resultat:string;
  idDossier:number;
  fkIdTestEpreuve:number;
  fkIdAnalyse:number;
}
