import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExaminService } from '../../../services/examinService/examin.service';
import { DossierService } from '../../../services/dossierService/dossier.service';
import { EpreuveService } from '../../../services/epreuveService/epreuve.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-ajouter-examin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzIconDirective,
  ],
  templateUrl: './ajouter-examin.component.html',
  styleUrls: ['./ajouter-examin.component.css'],
})
export class AjouterExaminComponent implements OnInit {
  examinForm: FormGroup;
  loading: boolean = false;
  dossiers: any[] = [];
  epreuves: any[] = [];

  constructor(
    private fb: FormBuilder,
    private examinService: ExaminService,
    private dossierService: DossierService,
    private epreuveService: EpreuveService,
    private message: NzMessageService,
    private modalRef: NzModalRef
  ) {
    this.examinForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadForeignKeys();
  }

  createForm(): FormGroup {
    return this.fb.group({
      fkNumDossier: ['', Validators.required],
      fkIdEpreuve: ['', Validators.required],
      resultat: ['', Validators.required],
    });
  }

  loadForeignKeys(): void {
    this.dossierService.getAllDossiers().subscribe({
      next: (data) => {
        this.dossiers = data;
      },
      error: () => {
        this.message.error('Failed to load dossiers.');
      },
    });

    this.epreuveService.getAllEpreuves().subscribe({
      next: (data) => {
        this.epreuves = data;
      },
      error: () => {
        this.message.error('Failed to load epreuves.');
      },
    });
  }

  onSubmit(): void {
    if (this.examinForm.valid) {
      this.loading = true;
      this.examinService.createExamin(this.examinForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('Examin created successfully!');
          this.examinForm.reset();
          this.modalRef.close('success');
        },
        error: () => {
          this.loading = false;
          this.message.error('Failed to create examin.');
        },
      });
    }
  }
}
