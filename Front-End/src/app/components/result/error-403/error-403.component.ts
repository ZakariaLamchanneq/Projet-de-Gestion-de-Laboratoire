import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NzResultComponent} from 'ng-zorro-antd/result';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {AuthService} from '../../../services/AuthService/auth-service.service';


@Component({
  selector: 'app-error-403',
  standalone: true,
  template: `
    <nz-result nzStatus="403" nzTitle="403" nzSubTitle="Sorry, you are not authorized to access this page.">
      <div nz-result-extra>
        <button nz-button nzType="primary" (click)="goHome()" style="display: block; margin: 0 auto;">Back Home</button>
      </div>
    </nz-result>
  `,
  imports: [
    NzResultComponent,
    NzButtonComponent
  ]
})
export class Error403Component {

  role: string | null = null;

  constructor(private router: Router,
              private authService:AuthService) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    }

  goHome() {
    if (this.role === 'ADMIN_LABO') {
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/patients']);
    }
  }
}
