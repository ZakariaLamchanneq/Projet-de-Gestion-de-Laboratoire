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
import { Laboratoire } from '../../../models/laboratoire/laboratoire.model';
import {NzUploadComponent} from 'ng-zorro-antd/upload';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {NzIconDirective} from 'ng-zorro-antd/icon';

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
    NzUploadComponent,
    NzIconDirective,
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
      active: [false, Validators.required],
      dateActivation: [null, Validators.required],
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const isImage = file.type?.startsWith('image/');
    if (!isImage) {
      this.message.error('You can only upload image files!');
      return false;
    }

    // Convert NzUploadFile to native File if necessary
    const nativeFile = file as unknown as File;

    // Set the file to the form control
    this.laboratoireForm.patchValue({ logo: nativeFile });

    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => (this.logoPreview = e.target?.result ?? null);
    reader.readAsDataURL(nativeFile);

    return false; // Prevent auto-upload
  };


  handleUploadChange(event: any): void {
    if (event.file.status === 'removed') {
      // Reset the form control and preview if the file is removed
      this.logoPreview = null;
      this.laboratoireForm.patchValue({ logo: null });
    }
  }



  onSubmit(): void {
    if (this.laboratoireForm.valid) {
      this.loading = true;
      const formValues = this.laboratoireForm.value;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Logo = reader.result as string;
        formValues.logo = base64Logo.split(',')[1]; // Remove metadata prefix (e.g., "data:image/png;base64,")

        const laboratoireData: Laboratoire = {
          ...formValues,
          dateActivation: formValues.dateActivation
            ? formValues.dateActivation.toISOString().split('T')[0]
            : null,
        };

        // Submit the form data
        this.laboratoireService.createLaboratoire(laboratoireData).subscribe({
          next: () => {
            this.loading = false;
            this.message.success('Laboratory created successfully!');
            this.laboratoireForm.reset();
            this.modalRef.close('success');
          },
          error: () => {
            this.loading = false;
            this.message.error('Failed to create laboratory.');
          },
        });
      };

      reader.readAsDataURL(formValues.logo); // Convert file to base64
    }
  }

}
