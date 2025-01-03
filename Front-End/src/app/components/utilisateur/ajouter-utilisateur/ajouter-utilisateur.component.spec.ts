import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjouterUtilisateurComponent } from './ajouter-utilisateur.component';
import { UtilisateurService } from '../../../services/utilisateurService/utilisateur.service';
import { LaboratoireService } from '../../../services/laboratoireService/laboratoire.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('AjouterUtilisateurComponent', () => {
  let component: AjouterUtilisateurComponent;
  let fixture: ComponentFixture<AjouterUtilisateurComponent>;

  beforeEach(async () => {
    const utilisateurServiceMock = { createUtilisateur: jest.fn() };
    const laboratoireServiceMock = { getLaboratoires: jest.fn().mockReturnValue(of([])) }; // Ensure it returns an observable
    const notificationServiceMock = { error: jest.fn(), success: jest.fn() };
    const routerMock = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule, // Import BrowserAnimationsModule
        AjouterUtilisateurComponent
      ],
      providers: [
        { provide: UtilisateurService, useValue: utilisateurServiceMock },
        { provide: LaboratoireService, useValue: laboratoireServiceMock },
        { provide: NzNotificationService, useValue: notificationServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: NzModalRef, useValue: {} },
        provideHttpClient(withFetch())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
