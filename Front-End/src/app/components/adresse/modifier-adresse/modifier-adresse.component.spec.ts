import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifierAdresseComponent } from './modifier-adresse.component';
import { AdresseService } from '../../../services/adresseService/adresse.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('ModifierAdresseComponent', () => {
  let component: ModifierAdresseComponent;
  let fixture: ComponentFixture<ModifierAdresseComponent>;
  let adresseService: jasmine.SpyObj<AdresseService>;
  let messageService: jasmine.SpyObj<NzMessageService>;
  let modalRef: jasmine.SpyObj<NzModalRef>;

  beforeEach(async () => {
    const adresseServiceSpy = jasmine.createSpyObj('AdresseService', ['updateAdresse']);
    const messageServiceSpy = jasmine.createSpyObj('NzMessageService', ['success', 'error']);
    const modalRefSpy = jasmine.createSpyObj('NzModalRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ModifierAdresseComponent, ReactiveFormsModule],
      providers: [
        { provide: AdresseService, useValue: adresseServiceSpy },
        { provide: NzMessageService, useValue: messageServiceSpy },
        { provide: NzModalRef, useValue: modalRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierAdresseComponent);
    component = fixture.componentInstance;
    adresseService = TestBed.inject(AdresseService) as jasmine.SpyObj<AdresseService>;
    messageService = TestBed.inject(NzMessageService) as jasmine.SpyObj<NzMessageService>;
    modalRef = TestBed.inject(NzModalRef) as jasmine.SpyObj<NzModalRef>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form with address data', () => {
    const mockAdresse = { id: 1, numVoie: 123, nomVoie: 'Main Street', codePostal: 12345, ville: 'Sample City', commune: 'Sample Commune' };
    component.adresse = mockAdresse;

    component.ngOnInit();

    expect(component.adresseForm.value).toEqual(mockAdresse);
  });

  it('should update address on submit', () => {
    const mockAdresse = { id: 1, numVoie: 123, nomVoie: 'Main Street', codePostal: 12345, ville: 'Sample City', commune: 'Sample Commune' };
    component.adresse = mockAdresse;
    component.adresseForm.setValue(mockAdresse);
    adresseService.updateAdresse.and.returnValue(of(mockAdresse));

    component.onSubmit();

    expect(adresseService.updateAdresse).toHaveBeenCalledWith(mockAdresse.id, mockAdresse);
    expect(messageService.success).toHaveBeenCalledWith('Address updated successfully!');
    expect(modalRef.close).toHaveBeenCalledWith('success');
  });

  it('should handle error when updating address', () => {
    const mockAdresse = { id: 1, numVoie: 123, nomVoie: 'Main Street', codePostal: 12345, ville: 'Sample City', commune: 'Sample Commune' };
    component.adresse = mockAdresse;
    component.adresseForm.setValue(mockAdresse);
    adresseService.updateAdresse.and.returnValue(throwError(() => new Error('Failed to update address')));

    component.onSubmit();

    expect(messageService.error).toHaveBeenCalledWith('Failed to update address.');
  });
});
