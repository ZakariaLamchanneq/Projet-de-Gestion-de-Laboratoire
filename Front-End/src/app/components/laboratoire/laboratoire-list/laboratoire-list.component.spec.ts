import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoireListComponent } from './laboratoire-list.component';
import { LaboratoireService } from '../../../services/laboratoire.service';
import { provideHttpClient } from '@angular/common/http';

describe('LaboratoireListComponent', () => {
  let component: LaboratoireListComponent;
  let fixture: ComponentFixture<LaboratoireListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboratoireListComponent],
      providers: [LaboratoireService, provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
