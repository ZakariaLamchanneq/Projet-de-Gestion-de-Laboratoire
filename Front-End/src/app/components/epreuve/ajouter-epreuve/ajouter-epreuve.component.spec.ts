import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEpreuveComponent } from './ajouter-epreuve.component';

describe('AjouterEpreuveComponent', () => {
  let component: AjouterEpreuveComponent;
  let fixture: ComponentFixture<AjouterEpreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterEpreuveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterEpreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
