import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdresseService } from '../../../services/adresseService/adresse.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-ajouter-adresse',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzIconDirective,
  ],
  templateUrl: './ajouter-adresse.component.html',
  styleUrls: ['./ajouter-adresse.component.css'],
})
export class AjouterAdresseComponent implements OnInit {
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

  ngOnInit(): void {}

  createForm(): FormGroup {
    return this.fb.group({
      numVoie: ['', Validators.required],
      nomVoie: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      commune: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.adresseForm.valid) {
      this.loading = true;
      this.adresseService.createAdresse(this.adresseForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('Address created successfully!');
          this.adresseForm.reset();
          this.modalRef.close('success');
        },
        error: () => {
          this.loading = false;
          this.message.error('Failed to create address.');
        },
      });
    }
  }
}
