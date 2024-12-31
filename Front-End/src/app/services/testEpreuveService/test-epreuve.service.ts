import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TestEpreuveModel} from '../../models/test-epreuve/test-epreuve.model';

@Injectable({
  providedIn: 'root'
})
export class TestEpreuveService {
  private apiUrl = 'http://localhost:8222/api/testEpreuves';

  constructor(private http: HttpClient) { }

  getTestEpreuves(): Observable<TestEpreuveModel[]> {
    return this.http.get<TestEpreuveModel[]>(`${this.apiUrl}/all`);
  }

  deleteTestEpreuve(testEpreuveId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${testEpreuveId}`);
  }

  getTestEpreuveById(testEpreuveId: number): Observable<TestEpreuveModel> {
    return this.http.get<TestEpreuveModel>(`${this.apiUrl}/getEpreuve/${testEpreuveId}`);
  }

  updateTestEpreuve(testEpreuveId: number | undefined, testEpreuve: TestEpreuveModel): Observable<TestEpreuveModel> {
    return this.http.put<TestEpreuveModel>(`${this.apiUrl}/updateTestEpreuve/${testEpreuveId}`, testEpreuve);
  }

  createTestEpreuve(testEpreuve: TestEpreuveModel): Observable<TestEpreuveModel> {
    return this.http.post<TestEpreuveModel>(`${this.apiUrl}/add`, testEpreuve);
  }
}
