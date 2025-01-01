import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminComponent } from './examin.component';

describe('ExaminComponent', () => {
  let component: ExaminComponent;
  let fixture: ComponentFixture<ExaminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
