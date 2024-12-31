import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TestEpreuveModel} from '../../../models/test-epreuve/test-epreuve.model';
import {PatientService} from '../../../services/patientService/patient.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {TestEpreuveService} from '../../../services/testEpreuveService/test-epreuve.service';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzFormDirective} from 'ng-zorro-antd/form';

@Component({
  selector: 'app-ajouter-test-epreuve',
  standalone: true,
  imports: [
    FormsModule,
    NzButtonComponent,
    NzInputDirective,
    NzFormDirective
  ],
  templateUrl: './ajouter-test-epreuve.component.html',
  styleUrl: './ajouter-test-epreuve.component.css'
})
export class AddTestEpreuveComponent {

  newTest: TestEpreuveModel = {
    nomTest: '',
    intervalMinDeReference: 0,
    intervalMaxDeReference: 0,
    uniteDeReference: '',
    Details: ''
  };

  constructor(
    private testEpreuveService: TestEpreuveService,
    private message: NzMessageService,
    private router: Router,
    private modalRef: NzModalRef,
  ) {}


  closeModal(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.handleCancel();
    }
  }

  handleCancel(): void {
    this.modalRef.close();
  }

  handleOk(): void {
    if (this.newTest) {
      this.testEpreuveService.createTestEpreuve(this.newTest).subscribe(
        () => {

          this.router.navigate(["/test-epreuve"]);


          this.modalRef.close('success');
        },
        (error) => {
          this.message.error("Échec ");
        }
      );
    }
  }

}
