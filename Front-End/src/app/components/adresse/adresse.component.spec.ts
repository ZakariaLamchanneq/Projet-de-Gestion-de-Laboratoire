import { AdresseComponent } from './adresse.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdresseService } from '../../services/adresseService/adresse.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of, throwError } from 'rxjs';

describe('AdresseComponent', () => {
  let component: AdresseComponent;
  let fixture: ComponentFixture<AdresseComponent>;
  let adresseService: jasmine.SpyObj<AdresseService>;
  let modalService: jasmine.SpyObj<NzModalService>;
  let messageService: jasmine.SpyObj<NzMessageService>;

  beforeEach(async () => {
    const adresseServiceSpy = jasmine.createSpyObj('AdresseService', ['getAllAdresses', 'deleteAdresse']);
    const modalServiceSpy = jasmine.createSpyObj('NzModalService', ['create', 'confirm']);
    const messageServiceSpy = jasmine.createSpyObj('NzMessageService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [AdresseComponent],
      providers: [
        { provide: AdresseService, useValue: adresseServiceSpy },
        { provide: NzModalService, useValue: modalServiceSpy },
        { provide: NzMessageService, useValue: messageServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdresseComponent);
    component = fixture.componentInstance;
    adresseService = TestBed.inject(AdresseService) as jasmine.SpyObj<AdresseService>;
    modalService = TestBed.inject(NzModalService) as jasmine.SpyObj<NzModalService>;
    messageService = TestBed.inject(NzMessageService) as jasmine.SpyObj<NzMessageService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load addresses on init', () => {
    const mockAdresses = [{ id: 1, numVoie: 123, nomVoie: 'Main Street', codePostal: 12345, ville: 'Sample City', commune: 'Sample Commune' }];
    adresseService.getAllAdresses.and.returnValue(of(mockAdresses));

    component.ngOnInit();

    expect(component.adresses).toEqual(mockAdresses);
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading addresses', () => {
    adresseService.getAllAdresses.and.returnValue(throwError(() => new Error('Failed to load addresses')));

    component.ngOnInit();

    expect(component.loading).toBeFalse();
    expect(messageService.error).toHaveBeenCalledWith('Failed to load addresses.');
  });

  it('should delete address', () => {
    const mockId = 1;
    adresseService.deleteAdresse.and.returnValue(of(undefined));
    modalService.confirm.and.callFake((options) => options.nzOnOk());

    component.deleteAdresse(mockId);

    expect(adresseService.deleteAdresse).toHaveBeenCalledWith(mockId);
    expect(messageService.success).toHaveBeenCalledWith('Address deleted successfully!');
  });

  it('should handle error when deleting address', () => {
    const mockId = 1;
    adresseService.deleteAdresse.and.returnValue(throwError(() => new Error('Failed to delete address')));
    modalService.confirm.and.callFake((options) => options.nzOnOk());

    component.deleteAdresse(mockId);

    expect(adresseService.deleteAdresse).toHaveBeenCalledWith(mockId);
    expect(messageService.error).toHaveBeenCalledWith('Failed to delete address.');
  });
});
