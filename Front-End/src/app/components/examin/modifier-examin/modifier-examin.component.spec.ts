import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierExaminComponent } from './modifier-examin.component';

describe('ModifierExaminComponent', () => {
  let component: ModifierExaminComponent;
  let fixture: ComponentFixture<ModifierExaminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierExaminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierExaminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
