import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dossier } from '../../models/dossier/dossier.model';

@Injectable({
  providedIn: 'root'
})
export class DossierService {
  private apiUrl = 'http://localhost:8222/api/dossiers';

  constructor(private http: HttpClient) { }

  getAllDossiers(): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(`${this.apiUrl}/all`);
  }

  getDossierById(id: number): Observable<Dossier> {
    return this.http.get<Dossier>(`${this.apiUrl}/find/${id}`);
  }

  createDossier(dossier: Dossier): Observable<Dossier> {
    return this.http.post<Dossier>(`${this.apiUrl}/add`, dossier);
  }

  updateDossier(id: number, dossier: Dossier): Observable<Dossier> {
    return this.http.put<Dossier>(`${this.apiUrl}/edit/${id}`, dossier);
  }

  deleteDossier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getPatientsByUtilisateurEmail(email: string): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(`${this.apiUrl}/patients/${email}`);
  }
}
