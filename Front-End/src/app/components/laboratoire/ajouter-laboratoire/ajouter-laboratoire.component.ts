import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LaboratoireService } from '../../../services/laboratoireService/laboratoire.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { Laboratoire } from '../../../models/laboratoire.model';

@Component({
  selector: 'app-ajouter-laboratoire',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSwitchModule,
    NzDatePickerModule,
    NzButtonModule,
  ],
  templateUrl: './ajouter-laboratoire.component.html',
  styleUrls: ['./ajouter-laboratoire.component.css'],
})
export class AjouterLaboratoireComponent implements OnInit {
  laboratoireForm: FormGroup;
  logoPreview: string | ArrayBuffer | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private laboratoireService: LaboratoireService,
    private message: NzMessageService,
    private modalRef: NzModalRef
  ) {
    this.laboratoireForm = this.createForm();
  }

  ngOnInit(): void {}

  createForm(): FormGroup {
    return this.fb.group({
      nom: ['', Validators.required],
      nrc: ['', Validators.required],
      logo: [null, Validators.required],
      active: [false],
      dateActivation: [null],
    });
  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => (this.logoPreview = e.target?.result ?? null);
      reader.readAsDataURL(input.files[0]);
      this.laboratoireForm.patchValue({ logo: input.files[0] });
    }
  }



  onSubmit(): void {
    if (this.laboratoireForm.valid) {
      this.loading = true;
      const formValues = this.laboratoireForm.value;

      // For debuggin
      console.log(formValues);

      // Convert dateActivation to a LocalDate compatible string (yyyy-MM-dd)
      const laboratoireData: Laboratoire = {
        ...this.laboratoireForm, // Keep existing data if in edit mode
        ...formValues,
        dateActivation: formValues.dateActivation
          ? formValues.dateActivation.toISOString().split('T')[0]
          : null,
      };
      this.laboratoireService.createLaboratoire(laboratoireData).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('Laboratory created successfully!');
          this.laboratoireForm.reset();
          this.modalRef.close();
        },
        error: () => {
          this.loading = false;
          this.message.error('Failed to create laboratory.');
        },
      });
    }
  }
}
