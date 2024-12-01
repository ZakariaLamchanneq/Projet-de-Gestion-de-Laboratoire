import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterContactLaboratoireComponent } from './ajouter-contact-laboratoire.component';

describe('AjouterContactLaboratoireComponent', () => {
  let component: AjouterContactLaboratoireComponent;
  let fixture: ComponentFixture<AjouterContactLaboratoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterContactLaboratoireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterContactLaboratoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
