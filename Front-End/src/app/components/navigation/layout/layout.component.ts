import { Component } from '@angular/core';
import {Router, RouterLink, RouterModule} from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { AuthService } from '../../../services/AuthService/auth-service.service';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDropDownDirective, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzImageModule,
    CommonModule,
    FormsModule,
    NzTooltipDirective,
    NzAvatarComponent,
    NzButtonComponent,
    NzDropDownDirective,
    NzDropdownMenuComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  isCollapsed = true;
  logo = 'assets/images/logo1.png';
  role: string | null = null;
  visible = false;

  constructor(private authService: AuthService,
              private router: Router) {
    this.role = this.authService.getRole();
    const storedCollapsedState = localStorage.getItem('isCollapsed');
    this.isCollapsed = storedCollapsedState === 'true';
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('isCollapsed', this.isCollapsed.toString());
  }

  logout(): void {
    this.authService.logout();
  }

  profile(): void {
    this.router.navigate(['/profile']);
  }
}
