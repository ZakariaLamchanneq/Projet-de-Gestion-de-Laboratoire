import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierAdresseComponent } from './modifier-adresse.component';

describe('ModifierAdresseComponent', () => {
  let component: ModifierAdresseComponent;
  let fixture: ComponentFixture<ModifierAdresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierAdresseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
