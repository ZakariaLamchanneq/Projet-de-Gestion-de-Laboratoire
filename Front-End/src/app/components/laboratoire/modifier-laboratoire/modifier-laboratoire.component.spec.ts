import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierLaboratoireComponent } from './modifier-laboratoire.component';

describe('ModifierLaboratoireComponent', () => {
  let component: ModifierLaboratoireComponent;
  let fixture: ComponentFixture<ModifierLaboratoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierLaboratoireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierLaboratoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
