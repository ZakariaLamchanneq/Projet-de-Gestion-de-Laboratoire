import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Patient} from '../../../models/patient/patient.model';
import {PatientService} from '../../../services/patientService/patient.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzFormDirective} from 'ng-zorro-antd/form';

@Component({
  selector: 'app-ajouter-patient',
  standalone: true,
  imports: [
    NgIf,
    NzButtonComponent,
    NzDatePickerComponent,
    NzIconDirective,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzSelectComponent,
    NzOptionComponent,
    NzInputGroupComponent,
    NzFormDirective,
    NgForOf
  ],
  templateUrl: './ajouter-patient.component.html',
  styleUrl: './ajouter-patient.component.css'
})
export class AjouterPatientComponent {
  moroccanCities: string[] = [];
  newPatient: Patient = {
    nomComplet : '',
    dateNaissance : new Date(),
    lieuDeNaissance : '',
    sexe : '',
    typePieceIdentite : '',
    numPieceIdentite : 0,
    adresse : '',
    numTel: 0,
    email : '',
    visiblePour: ''
  };

  dateFormat = 'dd/MM/yyyy';


  constructor(
    private patientService: PatientService,
    private message: NzMessageService,
    private router: Router,
    private modalRef: NzModalRef,

  ) {}

  handleCancel(): void {
    this.modalRef.close();
  }

  handleOk(): void {
    if (this.newPatient) {
      this.patientService.createPatient(this.newPatient).subscribe(
        () => {

          this.router.navigate(["/patients"]);


          this.modalRef.close('success');
        },
        (error) => {
          this.message.error("Échec ");
        }
      );
    }
  }

  closeModal(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.handleCancel();
    }
  }


}
