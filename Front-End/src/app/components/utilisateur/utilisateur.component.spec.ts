import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjouterUtilisateurComponent } from './ajouter-utilisateur/ajouter-utilisateur.component';
import { UtilisateurService } from '../../services/utilisateurService/utilisateur.service';
import { LaboratoireService } from '../../services/laboratoireService/laboratoire.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { of } from 'rxjs';

describe('AjouterUtilisateurComponent', () => {
  let component: AjouterUtilisateurComponent;
  let fixture: ComponentFixture<AjouterUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AjouterUtilisateurComponent,
        BrowserAnimationsModule // Import BrowserAnimationsModule
      ],
      providers: [
        { provide: UtilisateurService, useValue: { createUtilisateur: jest.fn() } },
        { provide: LaboratoireService, useValue: { getLaboratoires: jest.fn().mockReturnValue(of([])) } },
        { provide: NzNotificationService, useValue: { error: jest.fn(), success: jest.fn() } },
        { provide: Router, useValue: { navigate: jest.fn() } },
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
