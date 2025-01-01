import { Component } from '@angular/core';
import { Laboratoire } from '../../models/laboratoire/laboratoire.model';
import { AuthService } from '../../services/AuthService/auth-service.service';
import { LaboratoireService } from '../../services/laboratoireService/laboratoire.service';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import {ContactLaboratoire} from '../../models/contactLaboratoire/contact-laboratoire.model';
import {Adresse} from '../../models/adresse/adresse.model';
import {ContactLaboratoireService} from '../../services/contactLaboratoireService/contact-laboratoire.service';
import {AdresseService} from '../../services/adresseService/adresse.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [
    DatePipe,
    NgIf,
    NzSpinComponent,
    NzButtonComponent,
    NgClass
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  laboratoire: Laboratoire | null = null;
  contact: ContactLaboratoire | null = null;
  adresse: Adresse | null = null;
  loading = true;

  constructor(
    private authService: AuthService,
    private laboratoireService: LaboratoireService,
    private contactService: ContactLaboratoireService,
    private adresseService: AdresseService
  ) {}

  ngOnInit(): void {
    const laboratoireId = this.authService.getLaboratoireId();
    if (laboratoireId) {
      this.laboratoireService.getLaboratoireById(laboratoireId).subscribe(
        (data) => {
          this.laboratoire = data;
          this.loading = false;

          // Récupérer les informations de contact
          this.contactService.getContactLaboratoireById(laboratoireId).subscribe(
            (contactData) => {
              this.contact = contactData;

              // Récupérer l'adresse
              this.adresseService.getAdresseById(contactData.fkIdAdresse).subscribe(
                (adresseData) => {
                  this.adresse = adresseData;
                },
                (error) => {
                  console.error('Erreur lors du chargement de l\'adresse', error);
                }
              );
            },
            (error) => {
              console.error('Erreur lors du chargement du contact', error);
            }
          );
        },
        (error) => {
          console.error('Erreur lors du chargement du laboratoire', error);
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
      console.error('Aucun ID de laboratoire trouvé dans le token.');
    }
  }
}
