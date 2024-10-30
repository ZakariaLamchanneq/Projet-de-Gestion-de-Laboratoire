import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierUtilisateurComponent } from './modifier-utilisateur.component';

describe('ModifierUtilisateurComponent', () => {
  let component: ModifierUtilisateurComponent;
  let fixture: ComponentFixture<ModifierUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
