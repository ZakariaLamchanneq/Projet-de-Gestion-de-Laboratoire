import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierEpreuveComponent } from './modifier-epreuve.component';

describe('ModifierEpreuveComponent', () => {
  let component: ModifierEpreuveComponent;
  let fixture: ComponentFixture<ModifierEpreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierEpreuveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierEpreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
