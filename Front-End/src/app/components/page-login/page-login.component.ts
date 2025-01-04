import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutComponent } from '../navigation/layout/layout.component';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { AuthService } from '../../services/AuthService/auth-service.service';
import {NgIf} from '@angular/common';
import {UtilisateurService} from '../../services/utilisateurService/utilisateur.service';

@Component({
  selector: 'app-page-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LayoutComponent,
    NzIconDirective,
    NgIf
  ],
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css'] // Corrected property name to styleUrls
})
export class PageLoginComponent {
  loginForm: FormGroup;
  resetFormGroup: FormGroup;
  errorMessage = '';
  isPasswordResetMode: boolean = false;
  resetMessage: string = '';
  resetError: string = '';
  isEmailSent: boolean = false;


  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private utilisateurService:UtilisateurService) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.resetFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // login() {
  //   if (this.loginForm.invalid) {
  //     return; // Prevent submission if the form is invalid
  //   }
  //
  //   const { email, password } = this.loginForm.value;
  //   console.log('Login form values:', this.loginForm.value);
  //
  //   this.authService.login({ email, password }).subscribe({
  //     next: (response) => {
  //       console.log('Login successful:', response);
  //       localStorage.setItem('token', response.token);
  //       this.router.navigate(['/profile']);
  //     },
  //     error: (err) => {
  //       console.error('Login error:', err);
  //       this.errorMessage = 'Invalid email or password';
  //     }
  //   });
  // }

  login() {
    if (this.loginForm.invalid) {
      return; // Prevent submission if the form is invalid
    }

    const { email, password } = this.loginForm.value;
    console.log('Login form values:', this.loginForm.value);

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token);

        // Get the role from the AuthService
        const role = this.authService.getRole();

        // Redirect based on role
        if (role === 'ADMINISTRATEUR') {
          this.router.navigate(['/home']); // Redirect to /statistique for ADMINISTRATEUR
        } else if (role === 'ADMIN_LABO') {
          this.router.navigate(['/home']); // Redirect to /profile for ADMIN_LABO
        } else if (role === 'TECHNICIEN') {
          this.router.navigate(['/patients']); // Redirect to /patient for TECHNICIEN
        } else {
          // Redirect to a default or fallback page
          this.router.navigate(['/']); // Or handle the case where the role is undefined
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }


  requestReset(): void {
    if (this.resetFormGroup.valid) {
      const email = this.resetFormGroup.value.email;

      this.utilisateurService.resetPassword(email).subscribe({
        next: (response) => {
          // The response should now contain an object with the message
          this.resetMessage = response.message; // Extracting the message property from the response
          this.resetError = '';
          this.isEmailSent = true; // Set to true on success
        },
        error: (err) => {
          this.resetError = 'Error: ' + (err.error?.error || 'Email not found.'); // Adjust the error retrieval
          this.resetMessage = '';
          this.isEmailSent = false; // Reset on error
        }
      });
    } else {
      this.resetError = 'Please enter a valid email.';
      this.isEmailSent = false; // Reset in case of invalid email
    }
  }

  // Switch to Reset Password Form
  switchToReset(): void {
    this.isPasswordResetMode = true;
  }

  // Switch Back to Login Form
  switchToLogin(): void {
    this.isPasswordResetMode = false;
    this.resetMessage = '';
    this.resetError = '';
  }
}
