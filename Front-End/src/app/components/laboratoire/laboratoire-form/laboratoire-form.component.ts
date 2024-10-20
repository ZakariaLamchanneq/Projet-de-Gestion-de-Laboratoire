import { Component } from '@angular/core';
import { LaboratoireService } from '../../../services/laboratoire.service';
import { FormBuilder, FormGroup,Validators, ReactiveFormsModule } from '@angular/forms';
import { Laboratoire } from '../../../models/laboratoire.model';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-laboratoire-form',
  standalone: true,
  imports: [ReactiveFormsModule, NzInputModule, NzCheckboxModule, NzDatePickerModule, NzButtonModule, CommonModule ],
  templateUrl: './laboratoire-form.component.html',
  styleUrl: './laboratoire-form.component.css',
})
export class LaboratoireFormComponent {
  laboratoireForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private laboratoireService: LaboratoireService

  ) {
    this.laboratoireForm = this.fb.group({
      nom: '',
      logo: '',
      nrc: '',
      active: false,
      dateActivation: '',
    });
  }

  onSubmit(): void {
    const newLaboratoire: Laboratoire = this.laboratoireForm.value;
    // if (this.laboratoireForm.valid) {
      this.laboratoireService
        .createLaboratoire(newLaboratoire)
        .subscribe(() => {
        });
      console.log(this.laboratoireForm.value);
      // this.message.success('Laboratory created successfully!');
      // } else {
      //   this.message.error('Please fill in all required fields.');
    // }
  }
}
