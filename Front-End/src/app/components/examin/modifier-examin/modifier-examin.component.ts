import { Component, Input, OnInit } from '@angular/core';
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
import { Examin } from '../../../models/examin/examin.model';

@Component({
  selector: 'app-modifier-examin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzIconDirective,
  ],
  templateUrl: './modifier-examin.component.html',
  styleUrls: ['./modifier-examin.component.css'],
})
export class ModifierExaminComponent implements OnInit {
  @Input() examin!: Examin;
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
    this.populateForm();
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

  populateForm(): void {
    if (this.examin) {
      this.examinForm.patchValue(this.examin);
    }
  }

  onSubmit(): void {
    if (this.examinForm.valid) {
      this.loading = true;
      this.examinService.updateExamin(this.examin.id, this.examinForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('Examin updated successfully!');
          this.modalRef.close('success');
        },
        error: () => {
          this.loading = false;
          this.message.error('Failed to update examin.');
        },
      });
    }
  }
}
