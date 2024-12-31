import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utilisateur} from '../../models/utilisateur/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:8222/api/utilisateurs';

  constructor(private http: HttpClient) { }


  resetPasswordNew(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset`, { token, newPassword });
  }


  resetPassword(email: string): Observable<any> {
    return this.http.post(this.apiUrl + '/request', { email: email });
  }


  getUtilisateurById(utilisateurId: number):Observable<Utilisateur>{
    return this.http.get<Utilisateur>(`${this.apiUrl}/getUser/${utilisateurId}`);
  }

  updateUtilisateur(utilisateurId: number | undefined, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}/updateUtilisateur/${utilisateurId}`, utilisateur);
  }

  getUtilisateursByLaboratoire(laboratoireId: number): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/laboratoire/${laboratoireId}`);
  }

  getUtilisateursNonArchives(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/non-archives`);
  }
  unarchiveUtilisateur(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/unarchive`;
    return this.http.put(url, null);
  }
  getUtilisateursArchives(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/archives`);
  }

  // Archiver un utilisateur
  archiveUtilisateur(id: number): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}/${id}/archive`, {});
  }

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl+'/all');
  }

  createUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.apiUrl+'/add', utilisateur);
  }

  deleteUtilisateur(utilisateurId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${utilisateurId}`);
  }

}
