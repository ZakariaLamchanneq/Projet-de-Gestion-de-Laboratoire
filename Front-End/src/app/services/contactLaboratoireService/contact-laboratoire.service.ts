import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactLaboratoire } from '../../models/contactLaboratoire/contact-laboratoire.model';

@Injectable({
  providedIn: 'root'
})
export class ContactLaboratoireService {
  private apiUrl = 'http://localhost:8222/api/contacts-laboratoires';

  constructor(private http: HttpClient) { }

  getContactLaboratoireById(id: number): Observable<ContactLaboratoire> {
    return this.http.get<ContactLaboratoire>(`${this.apiUrl}/find/${id}`);
  }

  getAllContactsLaboratoire(): Observable<ContactLaboratoire[]> {
    return this.http.get<ContactLaboratoire[]>(`${this.apiUrl}/all`);
  }

  createContactLaboratoire(contactLaboratoire: ContactLaboratoire): Observable<ContactLaboratoire> {
    return this.http.post<ContactLaboratoire>(`${this.apiUrl}/add`, contactLaboratoire);
  }

  updateContactLaboratoire(id: number, contactLaboratoire: ContactLaboratoire): Observable<ContactLaboratoire> {
    return this.http.put<ContactLaboratoire>(`${this.apiUrl}/edit/${id}`, contactLaboratoire);
  }

  deleteContactLaboratoire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
