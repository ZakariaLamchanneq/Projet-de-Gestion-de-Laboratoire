import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterExaminComponent } from './ajouter-examin.component';

describe('AjouterExaminComponent', () => {
  let component: AjouterExaminComponent;
  let fixture: ComponentFixture<AjouterExaminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterExaminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterExaminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
