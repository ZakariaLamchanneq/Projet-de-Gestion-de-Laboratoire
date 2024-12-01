import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierContactLaboratoireComponent } from './modifier-contact-laboratoire.component';

describe('ModifierContactLaboratoireComponent', () => {
  let component: ModifierContactLaboratoireComponent;
  let fixture: ComponentFixture<ModifierContactLaboratoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierContactLaboratoireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierContactLaboratoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
