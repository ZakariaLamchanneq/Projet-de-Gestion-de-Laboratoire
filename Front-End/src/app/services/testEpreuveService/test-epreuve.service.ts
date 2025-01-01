import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestEpreuve } from '../../models/testEpreuve/test-epreuve.model';

@Injectable({
  providedIn: 'root'
})
export class TestEpreuveService {
  private apiUrl = 'http://localhost:8222/api/testEpreuves';

  constructor(private http: HttpClient) { }

  getAllTestEpreuves(): Observable<TestEpreuve[]> {
    return this.http.get<TestEpreuve[]>(`${this.apiUrl}/all`);
  }

  getTestEpreuveById(id: number): Observable<TestEpreuve> {
    return this.http.get<TestEpreuve>(`${this.apiUrl}/find/${id}`);
  }

  createTestEpreuve(testEpreuve: TestEpreuve): Observable<TestEpreuve> {
    return this.http.post<TestEpreuve>(`${this.apiUrl}/add`, testEpreuve);
  }

  updateTestEpreuve(id: number, testEpreuve: TestEpreuve): Observable<TestEpreuve> {
    return this.http.put<TestEpreuve>(`${this.apiUrl}/edit/${id}`, testEpreuve);
  }

  deleteTestEpreuve(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
