import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutComponent } from '../navigation/layout/layout.component';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { AuthService } from '../../services/AuthService/auth-service.service';
import {NgIf} from '@angular/common';

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
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return; // Prevent submission if the form is invalid
    }

    const { email, password } = this.loginForm.value;
    console.log(this.loginForm.value);

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/patients']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Invalid email or password';
      }
    });

  }
}
