import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EpreuveModel} from '../../models/epreuve/epreuve.model';


@Injectable({
  providedIn: 'root'
})
export class EpreuveService {
  private apiUrl = 'http://localhost:8222/api/epreuves';

  constructor(private http: HttpClient) { }

  getEpreuves(): Observable<EpreuveModel[]> {
    return this.http.get<EpreuveModel[]>(`${this.apiUrl}/all`);
  }

  deleteEpreuve(epreuveId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${epreuveId}`);
  }

  getEpreuveById(epreuveId: number): Observable<EpreuveModel> {
    return this.http.get<EpreuveModel>(`${this.apiUrl}/getEpreuve/${epreuveId}`);
  }

  updateEpreuve(epreuveId: number | undefined, epreuve: EpreuveModel): Observable<EpreuveModel> {
    return this.http.put<EpreuveModel>(`${this.apiUrl}/updateEpreuve/${epreuveId}`, epreuve);
  }

  createEpreuve(epreuve: EpreuveModel): Observable<EpreuveModel> {
    return this.http.post<EpreuveModel>(`${this.apiUrl}/add`, epreuve);
  }
}
