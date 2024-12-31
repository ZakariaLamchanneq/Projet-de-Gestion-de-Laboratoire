import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TestEpreuveService } from '../../../services/testEpreuveService/test-epreuve.service';
import { TestEpreuve } from '../../../models/testEpreuve/test-epreuve.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-modifier-test-epreuve',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzIconDirective,
  ],
  templateUrl: './modifier-test-epreuve.component.html',
  styleUrls: ['./modifier-test-epreuve.component.css'],
})
export class ModifierTestEpreuveComponent implements OnInit {
  @Input() testEpreuve!: TestEpreuve;
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

  ngOnInit(): void {
    this.populateForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      nomTest: ['', Validators.required],
      intervalMinDeReference: ['', Validators.required],
      intervalMaxDeReference: ['', Validators.required],
      uniteDeReference: ['', Validators.required],
      details: [''],
    });
  }

  populateForm(): void {
    if (this.testEpreuve) {
      this.testEpreuveForm.patchValue(this.testEpreuve);
    }
  }

  onSubmit(): void {
    if (this.testEpreuveForm.valid) {
      this.loading = true;
      this.testEpreuveService.updateTestEpreuve(this.testEpreuve.id, this.testEpreuveForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('Test epreuve updated successfully!');
          this.modalRef.close('success');
        },
        error: () => {
          this.loading = false;
          this.message.error('Failed to update test epreuve.');
        },
      });
    }
  }
}
