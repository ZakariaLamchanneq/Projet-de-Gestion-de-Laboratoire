import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjouterContactLaboratoireComponent } from './ajouter-contact-laboratoire.component';
import { ContactLaboratoireService } from '../../../services/contactLaboratoireService/contact-laboratoire.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NzModalRef } from 'ng-zorro-antd/modal';

describe('AjouterContactLaboratoireComponent', () => {
  let component: AjouterContactLaboratoireComponent;
  let fixture: ComponentFixture<AjouterContactLaboratoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AjouterContactLaboratoireComponent
      ],
      providers: [
        ContactLaboratoireService,
        provideHttpClient(withFetch()),
        { provide: NzModalRef, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterContactLaboratoireComponent);
    component = fixture.componentInstance;

    // Mock the animate function
    HTMLElement.prototype.animate = jest.fn().mockImplementation(() => ({
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      play: jest.fn(),
      cancel: jest.fn()
    }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
