import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientComponent } from './patient.component';
import {UtilisateurService} from '../../services/utilisateurService/utilisateur.service';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {PatientService} from '../../services/patientService/patient.service';

describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientComponent],
      providers: [PatientService, provideHttpClient(withFetch())]

    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
