import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaboratoireComponent } from './laboratoire.component';

describe('LaboratoireComponent', () => {
  let component: LaboratoireComponent;
  let fixture: ComponentFixture<LaboratoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboratoireComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LaboratoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
