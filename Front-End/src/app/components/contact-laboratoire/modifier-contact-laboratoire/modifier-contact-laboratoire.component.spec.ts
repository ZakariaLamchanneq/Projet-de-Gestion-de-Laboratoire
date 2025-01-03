import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModifierContactLaboratoireComponent } from './modifier-contact-laboratoire.component';
import { ContactLaboratoireService } from '../../../services/contactLaboratoireService/contact-laboratoire.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NzModalRef } from 'ng-zorro-antd/modal';

describe('ModifierContactLaboratoireComponent', () => {
  let component: ModifierContactLaboratoireComponent;
  let fixture: ComponentFixture<ModifierContactLaboratoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ModifierContactLaboratoireComponent
      ],
      providers: [
        ContactLaboratoireService,
        provideHttpClient(withFetch()),
        { provide: NzModalRef, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierContactLaboratoireComponent);
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
