import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Examin } from '../../models/examin/examin.model';

@Injectable({
  providedIn: 'root'
})
export class ExaminService {
  private apiUrl = 'http://localhost:8222/api/examins';

  constructor(private http: HttpClient) { }

  getAllExamins(): Observable<Examin[]> {
    return this.http.get<Examin[]>(`${this.apiUrl}/all`);
  }

  getExaminById(id: number): Observable<Examin> {
    return this.http.get<Examin>(`${this.apiUrl}/find/${id}`);
  }

  createExamin(examin: Examin): Observable<Examin> {
    return this.http.post<Examin>(`${this.apiUrl}/add`, examin);
  }

  updateExamin(id: number, examin: Examin): Observable<Examin> {
    return this.http.put<Examin>(`${this.apiUrl}/edit/${id}`, examin);
  }

  deleteExamin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getExaminsByDossierId(dossierId: number): Observable<Examin[]> {
    return this.http.get<Examin[]>(`${this.apiUrl}/dossier/${dossierId}`);
  }
}
