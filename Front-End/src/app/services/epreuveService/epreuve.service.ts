import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Epreuve } from '../../models/epreuve/epreuve.model';

@Injectable({
  providedIn: 'root'
})
export class EpreuveService {
  private apiUrl = 'http://localhost:8222/api/epreuves';

  constructor(private http: HttpClient) { }

  getAllEpreuves(): Observable<Epreuve[]> {
    return this.http.get<Epreuve[]>(`${this.apiUrl}/all`);
  }

  getEpreuveById(id: number): Observable<Epreuve> {
    return this.http.get<Epreuve>(`${this.apiUrl}/find/${id}`);
  }

  createEpreuve(epreuve: Epreuve): Observable<Epreuve> {
    return this.http.post<Epreuve>(`${this.apiUrl}/add`, epreuve);
  }

  updateEpreuve(id: number, epreuve: Epreuve): Observable<Epreuve> {
    return this.http.put<Epreuve>(`${this.apiUrl}/edit/${id}`, epreuve);
  }

  deleteEpreuve(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getEpreuvesByAnalyseId(analyseId: number): Observable<Epreuve[]> {
    return this.http.get<Epreuve[]>(`${this.apiUrl}/analyse/${analyseId}`);
  }
}
