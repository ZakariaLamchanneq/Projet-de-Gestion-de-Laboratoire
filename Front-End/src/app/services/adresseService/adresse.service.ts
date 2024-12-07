import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adresse } from '../../models/adresse/adresse.model';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {
  private apiUrl = 'http://localhost:8222/api/adresses';

  constructor(private http: HttpClient) { }

  getAllAdresses(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(`${this.apiUrl}/all`);
  }

  getAdresseById(id: number): Observable<Adresse> {
    return this.http.get<Adresse>(`${this.apiUrl}/find/${id}`);
  }

  createAdresse(adresse: Adresse): Observable<Adresse> {
    return this.http.post<Adresse>(`${this.apiUrl}/add`, adresse);
  }

  updateAdresse(id: number, adresse: Adresse): Observable<Adresse> {
    return this.http.put<Adresse>(`${this.apiUrl}/edit/${id}`, adresse);
  }

  deleteAdresse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
