import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Laboratoire } from '../../models/laboratoire/laboratoire.model';
import {Analyse} from '../../models/analyse/analyse.model';
import {LaboratoireFullResponse} from '../../models/laboratoire/laboratoire-full-response.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratoireService {
  private apiUrl = 'http://localhost:8222/api/laboratoires';

  constructor(private http: HttpClient) { }

  getLaboratoires(): Observable<Laboratoire[]> {
    return this.http.get<Laboratoire[]>(this.apiUrl+'/all');
  }

  getLaboratoireById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createLaboratoire(laboratoire: Laboratoire): Observable<Laboratoire> {
    const formData = new FormData();
    formData.append('nom', laboratoire.nom);
    formData.append('logo', laboratoire.logo); // Append the file
    formData.append('nrc', laboratoire.nrc);
    formData.append('active', String(laboratoire.active));
    formData.append('dateActivation', laboratoire.dateActivation.toString());
    return this.http.post<Laboratoire>(`${this.apiUrl}/add`, formData);
  }

  updateLaboratoire(id: number, laboratoire: Laboratoire): Observable<Laboratoire> {
    const formData = new FormData();
    formData.append('nom', laboratoire.nom);
    formData.append('nrc', laboratoire.nrc);
    formData.append('logo', laboratoire.logo);
    formData.append('active', String(laboratoire.active));

    // Safe date handling
    if (laboratoire.dateActivation) {
      formData.append('dateActivation', laboratoire.dateActivation.toString());
    }

    return this.http.put<Laboratoire>(`${this.apiUrl}/edit/${id}`, formData);
  }

  deleteLaboratoire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getLaboratoiresWithUsers(laboratoireId: number): Observable<LaboratoireFullResponse> {
    return this.http.get<LaboratoireFullResponse>(`${this.apiUrl}/with-users/${laboratoireId}`);
  }

  getAnalysesByLaboratoireId(laboratoireId: number): Observable<Analyse[]> {
    return this.http.get<Analyse[]>(`${this.apiUrl}/analyses/${laboratoireId}`);
  }

}
