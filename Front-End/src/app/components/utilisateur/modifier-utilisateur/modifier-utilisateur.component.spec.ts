import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifierUtilisateurComponent} from './modifier-utilisateur.component';
import {UtilisateurService} from '../../../services/utilisateurService/utilisateur.service';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {NzModalRef} from 'ng-zorro-antd/modal';

describe('ModifierUtilisateurComponent', () => {
  let component: ModifierUtilisateurComponent;
  let fixture: ComponentFixture<ModifierUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierUtilisateurComponent],
      providers: [UtilisateurService,
        provideHttpClient(withFetch()),
        {provide: NzModalRef, useValue: {}}
      ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(ModifierUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
