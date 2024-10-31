import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { LaboratoireService } from '../../../services/laboratoireService/laboratoire.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Laboratoire } from '../../../models/laboratoire.model';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch'; // Importing NzSwitchModule for the toggle switch
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message'; // Import NzMessageService
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadComponent } from 'ng-zorro-antd/upload'; // Import NzModalRef

@Component({
  selector: 'app-laboratoire-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzInputModule,
    NzSwitchModule,
    NzDatePickerModule,
    NzButtonModule,
    CommonModule,
    NzUploadComponent,
  ],
  templateUrl: './laboratoire-form.component.html',
  styleUrls: ['./laboratoire-form.component.css'], // Corrected styleUrls to styleUrls
})
export class LaboratoireFormComponent implements OnInit, OnChanges {
  @Input() laboratoire?: Laboratoire; // Optional input for edit mode
  @Output() formSubmit = new EventEmitter<Laboratoire>(); // Emit form data when submitted

  laboratoireForm: FormGroup;
  logoPreview: string | ArrayBuffer | null = null; // Variable to hold logo preview
  loading: boolean = false; // Loading state
  successMessage: string = ''; // Success message
  errorMessage: string = ''; // Error message

  constructor(
    private fb: FormBuilder,
    private laboratoireService: LaboratoireService,
    private message: NzMessageService, // Inject message service
    private modalRef: NzModalRef // Inject NzModalRef
  ) {
    this.laboratoireForm = this.fb.group({
      nom: ['', Validators.required],
      nrc: ['', Validators.required],
      logo: [null, Validators.required], // Added validation for required field
      active: [false],
      dateActivation: [null],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['laboratoire'] && changes['laboratoire'].currentValue) {
      this.populateForm();
    }
  }

  initializeForm(): void {
    this.laboratoireForm = this.fb.group({
      nom: [this.laboratoire?.nom || '', Validators.required],
      nrc: [this.laboratoire?.nrc || '', Validators.required],
      logo: [null, Validators.required],
      active: [this.laboratoire?.active || false],
      dateActivation: [this.laboratoire?.dateActivation || null],
    });
    this.logoPreview = this.laboratoire?.logo ? 'data:image/png;base64,' + this.laboratoire.logo : null;
  }

  populateForm(): void {
    if (this.laboratoireForm && this.laboratoire) {
      this.laboratoireForm.patchValue({
        nom: this.laboratoire.nom,
        nrc: this.laboratoire.nrc,
        logo: this.laboratoire.logo,
        active: this.laboratoire.active,
        dateActivation: this.laboratoire.dateActivation,
      });
      this.logoPreview = this.laboratoire.logo ? 'data:image/png;base64,' + this.laboratoire.logo : null;
    }
  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.logoPreview = e.target?.result ?? null; // Set the logo preview
      };
      reader.readAsDataURL(input.files[0]);
      this.laboratoireForm.patchValue({ logo: input.files[0] }); // Store the file in the form
    }
  }

  onSubmit(): void {
    if (this.laboratoireForm.valid) {
      this.loading = true;
      const formValues = this.laboratoireForm.value;
      // Convert dateActivation to a LocalDate compatible string (yyyy-MM-dd)
      const laboratoireData: Laboratoire = {
        ...this.laboratoire, // Keep existing data if in edit mode
        ...formValues,
        dateActivation: formValues.dateActivation
          ? formValues.dateActivation.toISOString().split('T')[0]
          : null,
      };

      // Determine if we're in "create" or "edit" mode
      if (this.laboratoire) {
        // Edit mode
        this.laboratoireService
          .updateLaboratoire(this.laboratoire.id, laboratoireData)
          .subscribe({
            next: () => {
              this.loading = false;
              this.message.success('Laboratory updated successfully!');
              this.formSubmit.emit(laboratoireData); // Emit updated data
              this.modalRef.close();
            },
            error: () => {
              this.loading = false;
              this.message.error('Failed to update laboratory.');
            },
          });
      } else {
        // Create mode
        this.laboratoireService.createLaboratoire(laboratoireData).subscribe({
          next: () => {
            this.loading = false;
            this.message.success('Laboratory created successfully!');
            this.formSubmit.emit(laboratoireData); // Emit created data
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
}
