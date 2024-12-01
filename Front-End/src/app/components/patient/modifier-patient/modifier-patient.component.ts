import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {NzModalComponent, NzModalRef} from 'ng-zorro-antd/modal';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Patient} from '../../../models/patient/patient.model';
import {PatientService} from '../../../services/patientService/patient.service';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-modifier-patient',
  standalone: true,
  imports: [
    NzIconDirective,
    NzInputDirective,
    NzButtonComponent,
    FormsModule,
    NgIf,
    NzDatePickerComponent,
    NzModalComponent
  ],
  templateUrl: './modifier-patient.component.html',
  styleUrl: './modifier-patient.component.css'
})
export class ModifierPatientComponent {

  @Input() newUser?: Patient;
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
    if (this.newUser) {
      this.patientService.updatePatient(this.newUser.id, this.newUser).subscribe(
        () => {

          this.router.navigate(["/patients"]);


          this.modalRef.close('success');
        },
        (error) => {
          this.message.error("Échec de la modification du patient");
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
