import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utilisateur} from '../../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:8222/api/utilisateurs';

  constructor(private http: HttpClient) { }

  getUtilisateurById(utilisateurId: number):Observable<Utilisateur>{
    return this.http.get<Utilisateur>(`${this.apiUrl}/getUser/${utilisateurId}`);
  }

  updateUtilisateur(utilisateurId: number | undefined, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}/updateUtilisateur/${utilisateurId}`, utilisateur);
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
