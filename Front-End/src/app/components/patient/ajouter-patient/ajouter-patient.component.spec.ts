import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AjouterPatientComponent } from './ajouter-patient.component';
import { PatientService } from '../../../services/patientService/patient.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('AjouterPatientComponent', () => {
  let component: AjouterPatientComponent;
  let fixture: ComponentFixture<AjouterPatientComponent>;
  let patientService: jest.Mocked<PatientService>;

  beforeEach(async () => {
    const patientServiceMock = {
      createPatient: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        AjouterPatientComponent,
        BrowserAnimationsModule // Import BrowserAnimationsModule
      ],
      providers: [
        { provide: PatientService, useValue: patientServiceMock },
        { provide: NzModalRef, useValue: {} },
        provideHttpClient(withFetch())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterPatientComponent);
    component = fixture.componentInstance;
    patientService = TestBed.inject(PatientService) as jest.Mocked<PatientService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
