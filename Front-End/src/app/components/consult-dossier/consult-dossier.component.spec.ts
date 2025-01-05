import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultDossierComponent } from './consult-dossier.component';

describe('ConsultDossierComponent', () => {
  let component: ConsultDossierComponent;
  let fixture: ComponentFixture<ConsultDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultDossierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
