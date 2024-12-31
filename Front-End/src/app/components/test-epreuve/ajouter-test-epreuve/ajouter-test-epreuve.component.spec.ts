import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTestEpreuveComponent } from './ajouter-test-epreuve.component';

describe('AjouterTestEpreuveComponent', () => {
  let component: AjouterTestEpreuveComponent;
  let fixture: ComponentFixture<AjouterTestEpreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterTestEpreuveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterTestEpreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
