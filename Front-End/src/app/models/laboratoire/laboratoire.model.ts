export interface Laboratoire {
  id: number;
  nom: string;
  logo: string; // string to hold the base64 image data
  nrc: string;
  active: boolean;
  dateActivation: Date;
}
