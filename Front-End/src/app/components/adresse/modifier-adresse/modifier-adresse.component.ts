import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdresseService } from '../../../services/adresseService/adresse.service';
import { Adresse } from '../../../models/adresse/adresse.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-modifier-adresse',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzIconDirective,
  ],
  templateUrl: './modifier-adresse.component.html',
  styleUrls: ['./modifier-adresse.component.css'],
})
export class ModifierAdresseComponent implements OnInit {
  @Input() adresse!: Adresse;
  adresseForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adresseService: AdresseService,
    private message: NzMessageService,
    private modalRef: NzModalRef
  ) {
    this.adresseForm = this.createForm();
  }

  ngOnInit(): void {
    this.populateForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      numVoie: ['', Validators.required],
      nomVoie: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      commune: ['', Validators.required],
    });
  }

  populateForm(): void {
    if (this.adresse) {
      this.adresseForm.patchValue(this.adresse);
    }
  }

  onSubmit(): void {
    if (this.adresseForm.valid) {
      this.loading = true;
      this.adresseService.updateAdresse(this.adresse.id, this.adresseForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('Address updated successfully!');
          this.modalRef.close('success');
        },
        error: () => {
          this.loading = false;
          this.message.error('Failed to update address.');
        },
      });
    }
  }
}
