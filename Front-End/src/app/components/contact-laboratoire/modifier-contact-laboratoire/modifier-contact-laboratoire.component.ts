import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactLaboratoireService } from '../../../services/contactLaboratoireService/contact-laboratoire.service';
import { LaboratoireService } from '../../../services/laboratoireService/laboratoire.service';
import { AdresseService } from '../../../services/adresseService/adresse.service';
import { ContactLaboratoire } from '../../../models/contactLaboratoire/contact-laboratoire.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Laboratoire } from '../../../models/laboratoire/laboratoire.model';
import { Adresse } from '../../../models/adresse/adresse.model';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-modifier-contact-laboratoire',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzIconDirective,
  ],
  templateUrl: './modifier-contact-laboratoire.component.html',
  styleUrls: ['./modifier-contact-laboratoire.component.css'],
})
export class ModifierContactLaboratoireComponent implements OnInit {
  @Input() contact!: ContactLaboratoire;
  contactForm: FormGroup;
  loading: boolean = false;
  laboratoires: Laboratoire[] = [];
  adresses: Adresse[] = [];

  constructor(
    private fb: FormBuilder,
    private contactLaboratoireService: ContactLaboratoireService,
    private laboratoireService: LaboratoireService,
    private adresseService: AdresseService,
    private message: NzMessageService,
    private modalRef: NzModalRef
  ) {
    this.contactForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadLaboratoires();
    this.loadAdresses();
    this.populateForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      numTel: ['', Validators.required],
      fax: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fkIdLaboratoire: ['', Validators.required],
      fkIdAdresse: ['', Validators.required],
    });
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

  populateForm(): void {
    if (this.contact) {
      this.contactForm.patchValue(this.contact);
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading = true;
      this.contactLaboratoireService.updateContactLaboratoire(this.contact.id, this.contactForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('Contact updated successfully!');
          this.modalRef.close('success');
        },
        error: () => {
          this.loading = false;
          this.message.error('Failed to update contact.');
        },
      });
    }
  }
}
