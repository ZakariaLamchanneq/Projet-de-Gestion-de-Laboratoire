import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifierAdresseComponent } from './modifier-adresse.component';
import { AdresseService } from '../../../services/adresseService/adresse.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('ModifierAdresseComponent', () => {
  let component: ModifierAdresseComponent;
  let fixture: ComponentFixture<ModifierAdresseComponent>;
  let adresseService: jest.Mocked<AdresseService>;

  beforeEach(async () => {
    const adresseServiceMock = {
      updateAdresse: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ModifierAdresseComponent],
      providers: [
        { provide: AdresseService, useValue: adresseServiceMock },
        { provide: NzModalRef, useValue: {} },
        provideHttpClient(withFetch())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierAdresseComponent);
    component = fixture.componentInstance;
    adresseService = TestBed.inject(AdresseService) as jest.Mocked<AdresseService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
