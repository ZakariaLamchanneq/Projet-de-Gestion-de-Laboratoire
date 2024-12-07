import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LaboratoireService } from '../../../services/laboratoireService/laboratoire.service';
import { Laboratoire } from '../../../models/laboratoire/laboratoire.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {NzUploadFile, NzUploadModule} from 'ng-zorro-antd/upload';
import { CommonModule } from '@angular/common';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-modifier-laboratoire',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSwitchModule,
    NzDatePickerModule,
    NzButtonModule,
    NzUploadModule,
    NzIconDirective,
  ],
  templateUrl: './modifier-laboratoire.component.html',
  styleUrls: ['./modifier-laboratoire.component.css'],
})
export class ModifierLaboratoireComponent implements OnInit {
  @Input() laboratoire!: Laboratoire;
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

  ngOnInit(): void {
    this.populateForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      nom: ['', Validators.required],
      nrc: ['', Validators.required],
      logo: [null, Validators.required],
      active: [false, Validators.required],
      dateActivation: [null, Validators.required],
    });
  }

  populateForm(): void {
    if (this.laboratoire) {
      this.laboratoireForm.patchValue(this.laboratoire);
      // Convert dateActivation from string to Date if it's a string
      if (this.laboratoire.dateActivation) {
        this.laboratoireForm.patchValue({
          dateActivation: new Date(this.laboratoire.dateActivation),
        });
      }
      this.logoPreview = this.laboratoire.logo;
    }
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const isImage = file.type?.startsWith('image/');
    if (!isImage) {
      this.message.error('You can only upload image files!');
      return false;
    }

    const isSizeValid = file.size! / 1024 / 1024 < 5; // 5MB limit
    if (!isSizeValid) {
      this.message.error('Image must be smaller than 5MB!');
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.logoPreview = e.target?.result ?? null;
      const base64Logo = (e.target?.result as string).split(',')[1];
      this.laboratoireForm.patchValue({ logo: base64Logo });
    };
    reader.readAsDataURL(file as unknown as File);

    // Important: Return true to allow upload
    return true;
  };


  onSubmit(): void {
    if (this.laboratoireForm.valid) {
      this.loading = true;
      const formValues = this.laboratoireForm.value;

      // Format date if needed
      const formattedDate = formValues.dateActivation
        ? new Date(formValues.dateActivation).toISOString().split('T')[0]
        : null;

      const updatedLaboratoire: Laboratoire = {
        ...this.laboratoire,
        ...formValues,
        logo: formValues.logo,
        dateActivation: formattedDate,
      };

      this.laboratoireService.updateLaboratoire(this.laboratoire.id, updatedLaboratoire).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('Laboratory updated successfully!');
          this.modalRef.close('success');
        },
        error: () => {
          this.loading = false;
          this.message.error('Failed to update laboratory.');
        },
      });
    }
  }
}
