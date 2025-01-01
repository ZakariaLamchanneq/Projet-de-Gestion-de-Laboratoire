import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AnalyseService } from '../../../services/analyseService/analyse.service';
import { LaboratoireService } from '../../../services/laboratoireService/laboratoire.service';
import { Analyse } from '../../../models/analyse/analyse.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-modifier-analyse',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzIconDirective,
  ],
  templateUrl: './modifier-analyse.component.html',
  styleUrls: ['./modifier-analyse.component.css'],
})
export class ModifierAnalyseComponent implements OnInit {
  @Input() analyse!: Analyse;
  analyseForm: FormGroup;
  loading: boolean = false;
  laboratoires: any[] = [];

  constructor(
    private fb: FormBuilder,
    private analyseService: AnalyseService,
    private laboratoireService: LaboratoireService,
    private message: NzMessageService,
    private modalRef: NzModalRef
  ) {
    this.analyseForm = this.createForm();
  }

  ngOnInit(): void {
    this.populateForm();
    this.loadLaboratoires();
  }

  createForm(): FormGroup {
    return this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      fkIdLaboratoire: ['', Validators.required],
    });
  }

  populateForm(): void {
    if (this.analyse) {
      this.analyseForm.patchValue({
        nom: this.analyse.nom,
        description: this.analyse.description,
        fkIdLaboratoire: this.analyse.fkIdLaboratoire,
      });
    }
  }

  loadLaboratoires(): void {
    this.laboratoireService.getLaboratoires().subscribe({
      next: (data) => {
        this.laboratoires = data;
      },
      error: () => {
        this.message.error('Failed to load laboratories.');
      },
    });
  }

  onSubmit(): void {
    if (this.analyseForm.valid) {
      this.loading = true;
      this.analyseService.updateAnalyse(this.analyse.id, this.analyseForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('Analyse updated successfully!');
          this.modalRef.close('success');
        },
        error: () => {
          this.loading = false;
          this.message.error('Failed to update analyse.');
        },
      });
    }
  }
}
