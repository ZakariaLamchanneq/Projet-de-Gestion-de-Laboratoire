import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzFilterTriggerComponent, NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {Patient} from '../../models/patient/patient.model';
import {PatientService} from '../../services/patientService/patient.service';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {ModifierPatientComponent} from './modifier-patient/modifier-patient.component';
import {AjouterPatientComponent} from './ajouter-patient/ajouter-patient.component';


@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NzButtonComponent,
    NzDropdownMenuComponent,
    NzFilterTriggerComponent,
    NzIconDirective,
    NzInputDirective,
    NzTableComponent,
    NzModalModule,
    NzThAddOnComponent,
    DatePipe,
    NgIf,
    NzTagComponent
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {
  searchValue = '';
  visible = false;
  pageIndex = 1;
  paginatedData: Patient[] = [];
  listOfData: Patient[] = [];
  listOfDisplayData: Patient[] = []; // Liste des utilisateurs affichés, filtrée si la recherche est appliquée


  constructor(
    private patientService: PatientService,
    private modal: NzModalService,
    private message: NzMessageService,

  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }






  fetchUsers(): void {
    this.patientService.getPatients().subscribe((data) => {
      this.listOfData = data;
      this.listOfDisplayData = [...this.listOfData];
      this.updatePaginatedData();
    });
  }



  updatePaginatedData(): void {
    const startIndex = (this.pageIndex - 1) * 5;
    this.paginatedData = this.listOfDisplayData.slice(startIndex, startIndex + 5);
  }


  reset(): void {
    this.searchValue = '';
    this.applyFilter();
  }

  search(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    this.listOfDisplayData = this.listOfData.filter((patient: Patient) =>
      patient.nomComplet.toLowerCase().includes(this.searchValue.toLowerCase())
    );
    this.pageIndex = 1;
    this.updatePaginatedData();
  }

  showAddPatientModal(): void {
    const modalRef = this.modal.create({
      nzTitle: '',
      nzContent: AjouterPatientComponent,
      nzFooter: null

    });

    modalRef.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.message.success('Patient ajouté avec succès');
        this.fetchUsers();
      }
    });
  }


  editPatient(patientId: number | undefined): void {
    if (patientId !== undefined) {
      this.patientService.getPatientById(patientId).subscribe((patient) => {
        const newPatient = { ...patient } ;


        const modalRef = this.modal.create({
          nzTitle: 'Modifier Patient',
          nzContent: ModifierPatientComponent,
          nzFooter: null,
        });


        if (modalRef.componentInstance instanceof ModifierPatientComponent) {
          modalRef.componentInstance.newUser = newPatient;
        }

        // Subscribe to modal close event
        modalRef.afterClose.subscribe((result) => {
          if (result === 'success') {
            this.message.success('Patient modifié avec succès');
            this.fetchUsers();
          }
        });
      });
    }
  }



  deletePatient(patientId: number | undefined): void {
    if (patientId !== undefined) {
      this.modal.confirm({
        nzTitle: 'Êtes-vous sûr de vouloir supprimer cet patient ?',
        nzContent: 'Cette action est irréversible.',
        nzOnOk: () => {
          this.patientService.deletePatient(patientId).subscribe({
            next: () => {
              this.message.create('success', 'Patient supprimé avec succès.');
              this.fetchUsers();
            },
            error: () => {
              this.message.create('error', 'Échec de la suppression du patient.');
            }
          });
        }
      });
    }
  }
}
