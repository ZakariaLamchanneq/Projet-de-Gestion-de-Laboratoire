import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTestEpreuveComponent } from './modifier-test-epreuve.component';

describe('ModifierTestEpreuveComponent', () => {
  let component: ModifierTestEpreuveComponent;
  let fixture: ComponentFixture<ModifierTestEpreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierTestEpreuveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierTestEpreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
