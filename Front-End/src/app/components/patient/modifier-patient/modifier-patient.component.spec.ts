import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { ModifierPatientComponent } from './modifier-patient.component';
import { PatientService } from '../../../services/patientService/patient.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('ModifierPatientComponent', () => {
  let component: ModifierPatientComponent;
  let fixture: ComponentFixture<ModifierPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierPatientComponent],
      providers: [
        PatientService,
        provideHttpClient(withFetch()),
        { provide: NzModalRef, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModifierPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
