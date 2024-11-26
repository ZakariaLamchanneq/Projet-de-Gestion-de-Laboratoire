import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../../models/patient.model';
import {Utilisateur} from '../../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:8222/api/patients';

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl+'/all');
  }

  deletePatient(patientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletePatient/${patientId}`);
  }

  getPatientById(patientId: number):Observable<Patient>{
    return this.http.get<Patient>(`${this.apiUrl}/getPatient/${patientId}`);
  }

  updatePatient(patientId: number | undefined, patient: Patient): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}/updatePatient/${patientId}`, patient);
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl+'/add',patient);
  }

}
