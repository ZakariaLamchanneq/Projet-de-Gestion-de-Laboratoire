import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LaboratoireService } from '../../../services/laboratoireService/laboratoire.service';
import { Laboratoire } from '../../../models/laboratoire.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './modifier-laboratoire.component.html',
  styleUrls: ['./modifier-laboratoire.component.css'],
})
export class ModifierLaboratoireComponent implements OnInit{
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
      active: [false],
      dateActivation: [null],
    });
  }

  populateForm(): void {
    if (this.laboratoire) {  // Check if laboratoire is defined
      this.laboratoireForm.patchValue({
        nom: this.laboratoire.nom,
        nrc: this.laboratoire.nrc,
        logo: this.laboratoire.logo,
        active: this.laboratoire.active,
        dateActivation: this.laboratoire.dateActivation,
      });
      this.logoPreview = this.laboratoire.logo
        ? 'data:image/png;base64,' + this.laboratoire.logo
        : null;
    }
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
  // onLogoSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   const file = input.files?.[0];
  //
  //   if (!file) {
  //     return;
  //   }
  //
  //   // Validate file type
  //   if (!file.type.match(/image\/(png|jpeg|jpg)/)) {
  //     this.message.error('Only PNG, JPEG and JPG files are allowed');
  //     input.value = '';
  //     return;
  //   }
  //
  //   // Validate file size (e.g., 5MB)
  //   const maxSize = 5 * 1024 * 1024;
  //   if (file.size > maxSize) {
  //     this.message.error('File size should not exceed 5MB');
  //     input.value = '';
  //     return;
  //   }
  //
  //   const reader = new FileReader();
  //
  //   reader.onload = () => {
  //     try {
  //       const base64String = reader.result as string;
  //       // Remove data URL prefix if exists
  //       const base64 = base64String.split(',')[1] || base64String;
  //
  //       this.logoPreview = `data:${file.type};base64,${base64}`;
  //       this.laboratoireForm.patchValue({ logo: base64 });
  //     } catch (error) {
  //       this.message.error('Failed to process image');
  //       console.error('Error processing image:', error);
  //       this.logoPreview = null;
  //       this.laboratoireForm.patchValue({ logo: null });
  //     }
  //   };
  //
  //   reader.onerror = () => {
  //     this.message.error('Failed to read file');
  //     this.logoPreview = null;
  //     this.laboratoireForm.patchValue({ logo: null });
  //   };
  //
  //   reader.readAsDataURL(file);
  // }

  // onSubmit(): void {
  //   if (this.laboratoireForm.valid) {
  //     this.loading = true;
  //     const updatedLaboratoire: Laboratoire = {
  //       ...this.laboratoire,
  //       ...this.laboratoireForm.value,
  //     };
  //     this.laboratoireService.updateLaboratoire(this.laboratoire.id, updatedLaboratoire).subscribe({
  //       next: () => {
  //         this.loading = false;
  //         this.message.success('Laboratory updated successfully!');
  //         this.modalRef.close();
  //       },
  //       error: () => {
  //         this.loading = false;
  //         this.message.error('Failed to update laboratory.');
  //       },
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.laboratoireForm.valid) {
      this.loading = true;
      const formValues = this.laboratoireForm.value;

      // Handle date formatting
      let formattedDate = null;
      if (formValues.dateActivation) {
        if (formValues.dateActivation instanceof Date) {
          formattedDate = formValues.dateActivation.toISOString().split('T')[0];
        } else if (typeof formValues.dateActivation === 'string') {
          formattedDate = formValues.dateActivation;
        }
      }

      // Convert base64 logo to File if no new file is selected
      let logoFile: File | null = null;

      if (formValues.logo instanceof File) {
        // If user uploaded a new file, use it
        logoFile = formValues.logo;
      } else if (this.laboratoire.logo) {
        // Handle raw base64 or prefixed base64
        let base64Logo = this.laboratoire.logo;
        if (!base64Logo.startsWith('data:image/')) {
          // Guess MIME type based on initial bytes or default to image/jpeg
          const mimeType = base64Logo.charAt(0) === '/' ? 'image/jpeg' : 'image/png';
          base64Logo = `data:${mimeType};base64,${base64Logo}`;
        }

        try {
          const base64Data = base64Logo.split(',')[1]; // Extract the actual base64 content
          const byteString = atob(base64Data);
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const uint8Array = new Uint8Array(arrayBuffer);

          for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
          }

          const blob = new Blob([uint8Array], { type: 'image/png' }); // Adjust MIME type if needed
          logoFile = new File([blob], 'logo.png', { type: 'image/png' });
        } catch (error) {
          console.error('Error decoding base64 logo:', error);
          this.message.error('Invalid logo format. Please upload a valid logo.');
          this.loading = false;
          return;
        }
      }

      // Create Laboratoire object
      const laboratoireData: Laboratoire = {
        ...this.laboratoire,
        ...formValues,
        logo: logoFile, // Ensure it's a File object
        dateActivation: formattedDate,
      };
      console.log(laboratoireData);
      // Call the service
      this.laboratoireService.updateLaboratoire(this.laboratoire.id, laboratoireData).subscribe({
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
