import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {UtilisateurService} from '../../services/utilisateurService/utilisateur.service';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    NzSpinComponent,
    ReactiveFormsModule,
    NzInputDirective,
    NgIf,
    RouterLink,
    NzButtonComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string | null = null;
  loading = false;
  isPasswordReset = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private message: NzMessageService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Get token from the URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  // Method to handle password reset
  onSubmit(): void {
    if (this.resetForm.invalid) {
      return;
    }

    const { newPassword, confirmPassword } = this.resetForm.value;

    if (newPassword !== confirmPassword) {
      this.message.error('Passwords do not match.');
      return;
    }
    console.log(this.token,newPassword);
    if (this.token) {

      this.loading = true;
      this.utilisateurService.resetPasswordNew(this.token, newPassword).subscribe(
        (response) => {

          this.isPasswordReset = true;
          this.message.success('Password successfully reset.');
          this.router.navigate(['/login']); // Navigate to login after success
        },
        (error) => {
          this.loading = false;
          this.message.error(error.error.message || 'Failed to reset password.');
        }
      );
    }
  }
}
