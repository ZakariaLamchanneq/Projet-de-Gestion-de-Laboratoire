import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactLaboratoireComponent } from './contact-laboratoire.component';

describe('ContactLaboratoireComponent', () => {
  let component: ContactLaboratoireComponent;
  let fixture: ComponentFixture<ContactLaboratoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactLaboratoireComponent]
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
