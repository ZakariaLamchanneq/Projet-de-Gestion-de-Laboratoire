import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdresseComponent } from './adresse.component';
import { AdresseService } from '../../services/adresseService/adresse.service';
import { of } from 'rxjs';

describe('AdresseComponent', () => {
  let component: AdresseComponent;
  let fixture: ComponentFixture<AdresseComponent>;
  let adresseService: jest.Mocked<AdresseService>;

  beforeEach(async () => {
    const adresseServiceMock = {
      getAllAdresses: jest.fn().mockReturnValue(of([])), // Ensure it returns an observable
    };

    await TestBed.configureTestingModule({
      imports: [AdresseComponent],
      providers: [
        { provide: AdresseService, useValue: adresseServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdresseComponent);
    component = fixture.componentInstance;
    adresseService = TestBed.inject(AdresseService) as jest.Mocked<AdresseService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
