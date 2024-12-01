import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {AuthService} from '../../../services/AuthService/auth-service.service';

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
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {

  isCollapsed = false;
  logo = 'assets/images/logo1.png';
  role: string | null = null;

  constructor(private authService: AuthService) {
    this.role = this.authService.getRole();
  }

}
