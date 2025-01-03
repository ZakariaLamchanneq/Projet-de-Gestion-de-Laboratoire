import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { AjouterLaboratoireComponent } from './ajouter-laboratoire.component';
import { LaboratoireService } from '../../../services/laboratoireService/laboratoire.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('AjouterLaboratoireComponent', () => {
  let component: AjouterLaboratoireComponent;
  let fixture: ComponentFixture<AjouterLaboratoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterLaboratoireComponent],
      providers: [
        LaboratoireService,
        provideHttpClient(withFetch()),
        { provide: NzModalRef, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AjouterLaboratoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
