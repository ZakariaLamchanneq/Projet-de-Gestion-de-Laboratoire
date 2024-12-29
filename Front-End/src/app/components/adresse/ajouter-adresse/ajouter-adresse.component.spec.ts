import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjouterAdresseComponent } from './ajouter-adresse.component';
import { AdresseService } from '../../../services/adresseService/adresse.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('AjouterAdresseComponent', () => {
  let component: AjouterAdresseComponent;
  let fixture: ComponentFixture<AjouterAdresseComponent>;
  let adresseService: jasmine.SpyObj<AdresseService>;
  let messageService: jasmine.SpyObj<NzMessageService>;
  let modalRef: jasmine.SpyObj<NzModalRef>;

  beforeEach(async () => {
    const adresseServiceSpy = jasmine.createSpyObj('AdresseService', ['createAdresse']);
    const messageServiceSpy = jasmine.createSpyObj('NzMessageService', ['success', 'error']);
    const modalRefSpy = jasmine.createSpyObj('NzModalRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [AjouterAdresseComponent, ReactiveFormsModule],
      providers: [
        { provide: AdresseService, useValue: adresseServiceSpy },
        { provide: NzMessageService, useValue: messageServiceSpy },
        { provide: NzModalRef, useValue: modalRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterAdresseComponent);
    component = fixture.componentInstance;
    adresseService = TestBed.inject(AdresseService) as jasmine.SpyObj<AdresseService>;
    messageService = TestBed.inject(NzMessageService) as jasmine.SpyObj<NzMessageService>;
    modalRef = TestBed.inject(NzModalRef) as jasmine.SpyObj<NzModalRef>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create address on submit', () => {
    const mockAdresse = { id: 1, numVoie: 123, nomVoie: 'Main Street', codePostal: 12345, ville: 'Sample City', commune: 'Sample Commune' };
    component.adresseForm.setValue(mockAdresse);
    adresseService.createAdresse.and.returnValue(of(mockAdresse));

    component.onSubmit();

    expect(adresseService.createAdresse).toHaveBeenCalledWith(mockAdresse);
    expect(messageService.success).toHaveBeenCalledWith('Address created successfully!');
    expect(modalRef.close).toHaveBeenCalledWith('success');
  });

  it('should handle error when creating address', () => {
    const mockAdresse = { id: 1, numVoie: 123, nomVoie: 'Main Street', codePostal: 12345, ville: 'Sample City', commune: 'Sample Commune' };
    component.adresseForm.setValue(mockAdresse);
    adresseService.createAdresse.and.returnValue(throwError(() => new Error('Failed to create address')));

    component.onSubmit();

    expect(messageService.error).toHaveBeenCalledWith('Failed to create address.');
  });
});
