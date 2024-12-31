import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Analyse } from '../../models/analyse/analyse.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {
  private apiUrl = 'http://localhost:8222/api/analyses';

  constructor(private http: HttpClient) { }

  getAllAnalyses(): Observable<Analyse[]> {
    return this.http.get<Analyse[]>(`${this.apiUrl}/all`);
  }

  getAnalyseById(id: number): Observable<Analyse> {
    return this.http.get<Analyse>(`${this.apiUrl}/find/${id}`);
  }

  createAnalyse(analyse: Analyse): Observable<Analyse> {
    return this.http.post<Analyse>(`${this.apiUrl}/add`, analyse);
  }

  updateAnalyse(id: number, analyse: Analyse): Observable<Analyse> {
    return this.http.put<Analyse>(`${this.apiUrl}/edit/${id}`, analyse);
  }

  deleteAnalyse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getAnalysesByLaboratoireId(laboratoireId: number): Observable<Analyse[]> {
    return this.http.get<Analyse[]>(`${this.apiUrl}/laboratoire/${laboratoireId}`);
  }
}
