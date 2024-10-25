import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Laboratoire } from '../models/laboratoire.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratoireService {
  private apiUrl = 'http://localhost:8222/api/laboratoires';

  constructor(private http: HttpClient) { }

  getLaboratoires(): Observable<Laboratoire[]> {
    return this.http.get<Laboratoire[]>(this.apiUrl+'/all');
  }

  createLaboratoire(laboratoire: Laboratoire): Observable<Laboratoire> {
    return this.http.post<Laboratoire>(this.apiUrl+'/add', laboratoire);
  }

  // Add update and delete methods as needed
}
