import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DossierService } from '../../../services/dossierService/dossier.service';
import { PatientService } from '../../../services/patientService/patient.service';
import { UtilisateurService } from '../../../services/utilisateurService/utilisateur.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-ajouter-dossier',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzIconDirective,
    NzDatePickerComponent,
  ],
  templateUrl: './ajouter-dossier.component.html',
  styleUrls: ['./ajouter-dossier.component.css'],
})
export class AjouterDossierComponent implements OnInit {
  dossierForm: FormGroup;
  loading: boolean = false;
  patients: any[] = [];
  utilisateurs: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dossierService: DossierService,
    private patientService: PatientService,
    private utilisateurService: UtilisateurService,
    private message: NzMessageService,
    private modalRef: NzModalRef
  ) {
    this.dossierForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadForeignKeys();
  }

  createForm(): FormGroup {
    return this.fb.group({
      numDossier: ['', Validators.required],
      fkIdPatient: ['', Validators.required],
      fkEmailUtilisateur: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  loadForeignKeys(): void {
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
      },
      error: () => {
        this.message.error('Failed to load patients.');
      },
    });

    this.utilisateurService.getUtilisateurs().subscribe({
      next: (data) => {
        this.utilisateurs = data;
      },
      error: () => {
        this.message.error('Failed to load utilisateurs.');
      },
    });
  }

  onSubmit(): void {
    if (this.dossierForm.valid) {
      this.loading = true;
      this.dossierService.createDossier(this.dossierForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('Dossier created successfully!');
          this.dossierForm.reset();
          this.modalRef.close('success');
        },
        error: () => {
          this.loading = false;
          this.message.error('Failed to create dossier.');
        },
      });
    }
  }
}
