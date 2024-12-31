import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EpreuveService } from '../../../services/epreuveService/epreuve.service';
import { TestEpreuveService } from '../../../services/testEpreuveService/test-epreuve.service';
import { AnalyseService } from '../../../services/analyseService/analyse.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-ajouter-epreuve',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzIconDirective,
  ],
  templateUrl: './ajouter-epreuve.component.html',
  styleUrls: ['./ajouter-epreuve.component.css'],
})
export class AjouterEpreuveComponent implements OnInit {
  epreuveForm: FormGroup;
  testEpreuves: any[] = [];
  analyses: any[] = [];
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private epreuveService: EpreuveService,
    private testEpreuveService: TestEpreuveService,
    private analyseService: AnalyseService,
    private message: NzMessageService,
    private modalRef: NzModalRef
  ) {
    this.epreuveForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadTestEpreuves();
    this.loadAnalyses();
  }

  createForm(): FormGroup {
    return this.fb.group({
      nom: ['', Validators.required],
      fkIdTestEpreuve: [null, Validators.required],
      fkIdAnalyse: [null, Validators.required],
    });
  }

  loadTestEpreuves(): void {
    this.testEpreuveService.getAllTestEpreuves().subscribe({
      next: (data) => {
        this.testEpreuves = data;
      },
      error: () => {
        this.message.error('Failed to load test epreuves.');
      },
    });
  }

  loadAnalyses(): void {
    this.analyseService.getAllAnalyses().subscribe({
      next: (data) => {
        this.analyses = data;
      },
      error: () => {
        this.message.error('Failed to load analyses.');
      },
    });
  }

  onSubmit(): void {
    if (this.epreuveForm.valid) {
      this.loading = true;
      this.epreuveService.createEpreuve(this.epreuveForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('Epreuve created successfully!');
          this.modalRef.close('success');
        },
        error: () => {
          this.loading = false;
          this.message.error('Failed to create epreuve.');
        },
      });
    }
  }
}
