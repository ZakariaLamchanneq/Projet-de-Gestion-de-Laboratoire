import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAnalyseComponent } from './ajouter-analyse.component';

describe('AjouterAnalyseComponent', () => {
  let component: AjouterAnalyseComponent;
  let fixture: ComponentFixture<AjouterAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterAnalyseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
