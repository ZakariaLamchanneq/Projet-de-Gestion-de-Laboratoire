import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDossierComponent } from './modifier-dossier.component';

describe('ModifierDossierComponent', () => {
  let component: ModifierDossierComponent;
  let fixture: ComponentFixture<ModifierDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierDossierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
