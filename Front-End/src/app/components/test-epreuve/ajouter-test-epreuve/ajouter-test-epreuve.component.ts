import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TestEpreuveService } from '../../../services/testEpreuveService/test-epreuve.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-ajouter-test-epreuve',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzIconDirective,
  ],
  templateUrl: './ajouter-test-epreuve.component.html',
  styleUrls: ['./ajouter-test-epreuve.component.css'],
})
export class AjouterTestEpreuveComponent implements OnInit {
  testEpreuveForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private testEpreuveService: TestEpreuveService,
    private message: NzMessageService,
    private modalRef: NzModalRef
  ) {
    this.testEpreuveForm = this.createForm();
  }

  ngOnInit(): void {}

  createForm(): FormGroup {
    return this.fb.group({
      nomTest: ['', Validators.required],
      intervalMinDeReference: ['', Validators.required],
      intervalMaxDeReference: ['', Validators.required],
      uniteDeReference: ['', Validators.required],
      details: [''],
    });
  }

  onSubmit(): void {
    if (this.testEpreuveForm.valid) {
      this.loading = true;
      this.testEpreuveService.createTestEpreuve(this.testEpreuveForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('Test epreuve created successfully!');
          this.testEpreuveForm.reset();
          this.modalRef.close('success');
        },
        error: () => {
          this.loading = false;
          this.message.error('Failed to create test epreuve.');
        },
      });
    }
  }
}
