import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterLaboratoireComponent } from './ajouter-laboratoire.component';

describe('AjouterLaboratoireComponent', () => {
  let component: AjouterLaboratoireComponent;
  let fixture: ComponentFixture<AjouterLaboratoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterLaboratoireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterLaboratoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
