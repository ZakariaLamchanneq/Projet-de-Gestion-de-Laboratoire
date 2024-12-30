import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactLaboratoireComponent } from './contact-laboratoire.component';
import {LaboratoireService} from '../../services/laboratoireService/laboratoire.service';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {ContactLaboratoireService} from '../../services/contactLaboratoireService/contact-laboratoire.service';

describe('ContactLaboratoireComponent', () => {
  let component: ContactLaboratoireComponent;
  let fixture: ComponentFixture<ContactLaboratoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactLaboratoireComponent],
      providers: [ContactLaboratoireService, provideHttpClient(withFetch())]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactLaboratoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
