import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoireFormComponent } from './laboratoire-form.component';
import { LaboratoireService } from '../../../services/laboratoireService/laboratoire.service';
import { provideHttpClient } from '@angular/common/http';

describe('LaboratoireFormComponent', () => {
  let component: LaboratoireFormComponent;
  let fixture: ComponentFixture<LaboratoireFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboratoireFormComponent],
      providers: [LaboratoireService, provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
