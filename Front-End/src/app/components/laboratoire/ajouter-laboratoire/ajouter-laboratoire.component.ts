import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LaboratoireService} from '../../../services/laboratoireService/laboratoire.service';
import {AdresseService} from '../../../services/adresseService/adresse.service';
import {ContactLaboratoireService} from '../../../services/contactLaboratoireService/contact-laboratoire.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzUploadFile, NzUploadModule} from 'ng-zorro-antd/upload';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {Laboratoire} from '../../../models/laboratoire/laboratoire.model';
import {Adresse} from '../../../models/adresse/adresse.model';
import {ContactLaboratoire} from '../../../models/contactLaboratoire/contact-laboratoire.model';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-ajouter-laboratoire',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzStepsModule,
    NzInputModule,
    NzUploadModule,
    NzSwitchModule,
    NzDatePickerModule,
    NzSelectModule,
    NzButtonModule,
    NzIconDirective,
  ],
  templateUrl: './ajouter-laboratoire.component.html',
  styleUrls: ['./ajouter-laboratoire.component.css'],
})
export class AjouterLaboratoireComponent implements OnInit {
  laboratoireForm: FormGroup;
  adresseForm: FormGroup;
  contactForm: FormGroup;
  index = 0;
  loading = false;
  logoPreview: string | ArrayBuffer | null = null;
  laboratoires: Laboratoire[] = [];
  adresses: Adresse[] = [];
  contacts: ContactLaboratoire[] = [];
  showNewAdresseForm = false;
  showNewContactForm = false;

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
    this.loadLaboratoires();
    this.loadAdresses();
    this.loadContacts();
  }

  onIndexChange(event: number): void {
    this.index = event;
  }

  createLaboratoireForm(): FormGroup {
    return this.fb.group({
      nom: ['', Validators.required],
      nrc: ['', Validators.required],
      logo: [null, Validators.required],
      active: [false, Validators.required],
      dateActivation: [null, Validators.required],
    });
  }

  createAdresseForm(): FormGroup {
    return this.fb.group({
      existingAdresse: [null],
      numVoie: ['', Validators.required],
      nomVoie: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      commune: ['', Validators.required],
    });
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      existingContact: [null],
      numTel: ['', Validators.required],
      fax: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const isImage = file.type?.startsWith('image/');
    if (!isImage) {
      this.message.error('You can only upload image files!');
      return false;
    }

    const nativeFile = file as unknown as File;
    this.laboratoireForm.patchValue({logo: nativeFile});

    const reader = new FileReader();
    reader.onload = (e) => (this.logoPreview = e.target?.result ?? null);
    reader.readAsDataURL(nativeFile);

    return false;
  };

  handleUploadChange(event: any): void {
    if (event.file.status === 'removed') {
      this.logoPreview = null;
      this.laboratoireForm.patchValue({logo: null});
    }
  }

  loadLaboratoires(): void {
    this.laboratoireService.getLaboratoires().subscribe({
      next: (data) => this.laboratoires = data,
      error: () => this.message.error('Failed to load laboratoires.')
    });
  }

  loadAdresses(): void {
    this.adresseService.getAllAdresses().subscribe({
      next: (data) => this.adresses = data,
      error: () => this.message.error('Failed to load adresses.')
    });
  }

  loadContacts(): void {
    this.contactLaboratoireService.getAllContactsLaboratoire().subscribe({
      next: (data) => this.contacts = data,
      error: () => this.message.error('Failed to load contacts.')
    });
  }

  toggleNewAdresseForm(): void {
    this.showNewAdresseForm = !this.showNewAdresseForm;
  }

  toggleNewContactForm(): void {
    this.showNewContactForm = !this.showNewContactForm;
  }


  allFormsValid(): boolean {
    return this.laboratoireForm.valid && this.adresseForm.valid && this.contactForm.valid;
  }


  onSubmit(): void {
    if (this.allFormsValid()) {
      this.loading = true;

      const formValues = this.laboratoireForm.value;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Logo = reader.result as string;
        formValues.logo = base64Logo.split(',')[1]; // Remove metadata prefix (e.g., "data:image/png;base64,")

        const laboratoireData: Laboratoire = {
          ...formValues,
          dateActivation: formValues.dateActivation
            ? new Date(formValues.dateActivation).toISOString().split('T')[0]
            : null,
        };

        this.laboratoireService.createLaboratoire(laboratoireData).pipe(
          switchMap((laboratoire) => {
            const adresseData = {...this.adresseForm.value, fkIdLaboratoire: laboratoire.id};
            return this.adresseService.createAdresse(adresseData).pipe(
              switchMap((adresse) => {
                const contactData = {
                  ...this.contactForm.value,
                  fkIdLaboratoire: laboratoire.id,
                  fkIdAdresse: adresse.id,
                };
                return this.contactLaboratoireService.createContactLaboratoire(contactData);
              }),
              catchError((error) => {
                this.loading = false;
                this.message.error('Failed to create address: ' + error.message);
                return of(null); // Return an observable to complete the chain
              })
            );
          }),
          catchError((error) => {
            this.loading = false;
            this.message.error('Failed to create laboratory: ' + error.message);
            return of(null); // Return an observable to complete the chain
          })
        ).subscribe({
          next: () => {
            this.loading = false;
            this.message.success('Laboratory, address, and contact created successfully!');
            this.laboratoireForm.reset();
            this.adresseForm.reset();
            this.contactForm.reset();
            this.modalRef.close('success');
          },
          error: (error) => {
            this.loading = false;
            this.message.error('Failed to create contact: ' + error.message);
          },
        });
      };

      reader.readAsDataURL(this.laboratoireForm.get('logo')?.value);
    }
  }
}

