import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UtilisateurService } from '../../services/utilisateurService/utilisateur.service';
import { of } from 'rxjs';
import { ResetPasswordComponent } from './reset-password.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let utilisateurService: jest.Mocked<UtilisateurService>;
  let messageService: jest.Mocked<NzMessageService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const utilisateurServiceMock = {
      resetPasswordNew: jest.fn(),
    };
    const messageServiceMock = {
      error: jest.fn(),
      success: jest.fn(),
    };
    const routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ResetPasswordComponent],
      providers: [
        FormBuilder,
        { provide: UtilisateurService, useValue: utilisateurServiceMock },
        { provide: NzMessageService, useValue: messageServiceMock },
        { provide: Router, useValue: routerMock },
        provideHttpClient(withFetch()),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ token: 'test-token' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    utilisateurService = TestBed.inject(UtilisateurService) as jest.Mocked<UtilisateurService>;
    messageService = TestBed.inject(NzMessageService) as jest.Mocked<NzMessageService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    fixture.detectChanges();

    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get token from query params on init', () => {
    expect(component.token).toBe('test-token');
  });

  it('should show error if passwords do not match', () => {
    component.resetForm.setValue({ newPassword: 'password1', confirmPassword: 'password2' });
    component.onSubmit();
    expect(messageService.error).toHaveBeenCalledWith('Passwords do not match.');
  });

  it('should call resetPasswordNew and navigate on success', () => {
    component.resetForm.setValue({ newPassword: 'password', confirmPassword: 'password' });
    utilisateurService.resetPasswordNew.mockReturnValue(of({}));
    component.onSubmit();
    expect(utilisateurService.resetPasswordNew).toHaveBeenCalledWith('test-token', 'password');
    expect(messageService.success).toHaveBeenCalledWith('Password successfully reset.');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
