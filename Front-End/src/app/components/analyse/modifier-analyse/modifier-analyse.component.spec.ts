import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierAnalyseComponent } from './modifier-analyse.component';

describe('ModifierAnalyseComponent', () => {
  let component: ModifierAnalyseComponent;
  let fixture: ComponentFixture<ModifierAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierAnalyseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
