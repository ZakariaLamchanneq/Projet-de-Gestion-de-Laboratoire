import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ModifierLaboratoireComponent } from './modifier-laboratoire.component';
import { LaboratoireService } from '../../../services/laboratoireService/laboratoire.service';
import { ContactLaboratoireService } from '../../../services/contactLaboratoireService/contact-laboratoire.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { of } from 'rxjs';

describe('ModifierLaboratoireComponent', () => {
  let component: ModifierLaboratoireComponent;
  let fixture: ComponentFixture<ModifierLaboratoireComponent>;
  let contactLaboratoireService: jest.Mocked<ContactLaboratoireService>;

  beforeEach(async () => {
    const laboratoireServiceMock = { updateLaboratoire: jest.fn() };
    const contactLaboratoireServiceMock = {
      getContactsByLaboratoireId: jest.fn().mockReturnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [ModifierLaboratoireComponent],
      providers: [
        { provide: LaboratoireService, useValue: laboratoireServiceMock },
        { provide: ContactLaboratoireService, useValue: contactLaboratoireServiceMock },
        provideHttpClient(withFetch()),
        { provide: NzModalRef, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierLaboratoireComponent);
    component = fixture.componentInstance;
    contactLaboratoireService = TestBed.inject(ContactLaboratoireService) as jest.Mocked<ContactLaboratoireService>;
    component.laboratoire = { id: 1, nom: 'Test Lab', logo: '', nrc: '', active: true, dateActivation: new Date() }; // Mock laboratoire object
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
