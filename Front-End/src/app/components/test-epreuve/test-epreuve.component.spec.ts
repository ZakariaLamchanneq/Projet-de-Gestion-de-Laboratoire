import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEpreuveComponent } from './test-epreuve.component';

describe('TestEpreuveComponent', () => {
  let component: TestEpreuveComponent;
  let fixture: ComponentFixture<TestEpreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestEpreuveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestEpreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
