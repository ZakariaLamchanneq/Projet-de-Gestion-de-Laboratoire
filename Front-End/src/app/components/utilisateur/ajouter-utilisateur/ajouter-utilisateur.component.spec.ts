import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterUtilisateurComponent } from './ajouter-utilisateur.component';

describe('AjouterUtilisateurComponent', () => {
  let component: AjouterUtilisateurComponent;
  let fixture: ComponentFixture<AjouterUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
