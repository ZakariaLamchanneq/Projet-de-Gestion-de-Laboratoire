import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LaboratoireService } from '../../../services/laboratoireService/laboratoire.service';
import { AdresseService } from '../../../services/adresseService/adresse.service';
import { ContactLaboratoireService } from '../../../services/contactLaboratoireService/contact-laboratoire.service';
import { Laboratoire } from '../../../models/laboratoire/laboratoire.model';
import { Adresse } from '../../../models/adresse/adresse.model';
import { ContactLaboratoire } from '../../../models/contactLaboratoire/contact-laboratoire.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

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
    NzStepsModule,
    NzSelectModule,
    NzIconDirective,
  ],
  templateUrl: './modifier-laboratoire.component.html',
  styleUrls: ['./modifier-laboratoire.component.css'],
})
export class ModifierLaboratoireComponent implements OnInit {
  @Input() laboratoire!: Laboratoire;
  laboratoireForm: FormGroup;
  adresseForm: FormGroup;
  contactForm: FormGroup;
  contacts: ContactLaboratoire[] = [];
  index = 0;
  logoPreview: string | ArrayBuffer | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private laboratoireService: LaboratoireService,
    private adresseService: AdresseService,
    private contactLaboratoireService: ContactLaboratoireService,
    private message: NzMessageService,
    private modalRef: NzModalRef
  ) {
    this.laboratoireForm = this.createLaboratoireForm();
    this.adresseForm = this.createAdresseForm();
    this.contactForm = this.createContactForm();
  }

  ngOnInit(): void {
    this.populateForm();
    this.loadContacts();
  }

  onIndexChange(event: number): void {
    this.index = event;
  }

  createLaboratoireForm(): FormGroup {
    return this.fb.group({
      id: [ '', Validators.required],
      nom: ['', Validators.required],
      nrc: ['', Validators.required],
      logo: [null, Validators.required],
      active: [false, Validators.required],
      dateActivation: [null, Validators.required],
    });
  }

  createAdresseForm(): FormGroup {
    return this.fb.group({
      id: [ '', Validators.required],
      numVoie: ['', Validators.required],
      nomVoie: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      commune: ['', Validators.required],
    });
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      numTel: ['', Validators.required],
      fax: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactId: [null, Validators.required],
    });
  }

  populateForm(): void {
    if (this.laboratoire) {
      this.laboratoireForm.patchValue(this.laboratoire);
      if (this.laboratoire.dateActivation) {
        this.laboratoireForm.patchValue({
          dateActivation: new Date(this.laboratoire.dateActivation),
        });
      }
      this.logoPreview = this.laboratoire.logo;
    }
  }

  loadContacts(): void {
    this.contactLaboratoireService.getContactsByLaboratoireId(this.laboratoire.id).subscribe({
      next: (contacts) => {
        this.contacts = contacts;
      },
      error: () => {
        this.message.error('Failed to load contacts.');
      },
    });
  }

  onContactChange(contactId: number): void {
    const selectedContact = this.contacts.find(contact => contact.id === contactId);
    if (selectedContact) {
      this.contactForm.patchValue(selectedContact);
      this.adresseService.getAdresseById(selectedContact.fkIdAdresse).subscribe({
        next: (adresse) => {
          this.adresseForm.patchValue(adresse);
        },
        error: () => {
          this.message.error('Failed to load address.');
        },
      });
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

    return true;
  };

  allFormsValid(): boolean {
    return this.laboratoireForm.valid && this.adresseForm.valid && this.contactForm.valid;
  }

  onSubmit(): void {
    if (this.allFormsValid()) {
      this.loading = true;
      const formValues = this.laboratoireForm.value;

      // Use existing logo if form value is null
      const logo = formValues.logo ? formValues.logo : this.laboratoire.logo;

      const updateLaboratoire = (logoBase64: string | null) => {
        const updatedLaboratoire: Laboratoire = {
          ...this.laboratoire,
          ...formValues,
          logo: logoBase64,
          dateActivation: formValues.dateActivation
            ? new Date(formValues.dateActivation).toISOString().split('T')[0]
            : null,
        };

        this.laboratoireService.updateLaboratoire(updatedLaboratoire.id, updatedLaboratoire).pipe(
          switchMap((laboratoire) => {
            const adresseData = { ...this.adresseForm.value};
            return this.adresseService.updateAdresse(adresseData.id, adresseData).pipe(
              switchMap((adresse) => {
                const contactData = {
                  ...this.contactForm.value,
                  fkIdLaboratoire: laboratoire.id,
                  fkIdAdresse: adresse.id,
                };
                return this.contactLaboratoireService.updateContactLaboratoire(contactData.contactId, contactData);
              }),
              catchError((error) => {
                this.loading = false;
                this.message.error('Failed to update address: ' + error.message);
                return of(null);
              })
            );
          }),
          catchError((error) => {
            this.loading = false;
            this.message.error('Failed to update laboratory: ' + error.message);
            return of(null);
          })
        ).subscribe({
          next: () => {
            this.loading = false;
            this.message.success('Laboratory, address, and contact updated successfully!');
            this.modalRef.close('success');
          },
          error: (error) => {
            this.loading = false;
            this.message.error('Failed to update contact: ' + error.message);
          },
        });
      };

      if (logo instanceof Blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Logo = reader.result as string;
          updateLaboratoire(base64Logo.split(',')[1]);
        };
        reader.readAsDataURL(logo);
      } else {
        updateLaboratoire(logo);
      }
    }
  }
}
