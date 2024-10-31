import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoireComponent } from './laboratoire.component';
import { LaboratoireService } from '../../services/laboratoireService/laboratoire.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('LaboratoireComponent', () => {
  let component: LaboratoireComponent;
  let fixture: ComponentFixture<LaboratoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboratoireComponent],
      providers: [LaboratoireService, provideHttpClient(withFetch())]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
