import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjouterAdresseComponent } from './ajouter-adresse.component';
import { AdresseService } from '../../../services/adresseService/adresse.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('AjouterAdresseComponent', () => {
  let component: AjouterAdresseComponent;
  let fixture: ComponentFixture<AjouterAdresseComponent>;
  let adresseService: jest.Mocked<AdresseService>;

  beforeEach(async () => {
    const adresseServiceMock = {
      addAdresse: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AjouterAdresseComponent],
      providers: [
        { provide: AdresseService, useValue: adresseServiceMock },
        { provide: NzModalRef, useValue: {} },
        provideHttpClient(withFetch())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterAdresseComponent);
    component = fixture.componentInstance;
    adresseService = TestBed.inject(AdresseService) as jest.Mocked<AdresseService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
