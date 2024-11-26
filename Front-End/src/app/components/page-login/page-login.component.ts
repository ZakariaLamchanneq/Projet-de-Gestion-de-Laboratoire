import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {LayoutComponent} from '../navigation/layout/layout.component';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-page-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LayoutComponent,
    NzIconDirective
  ],
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.css'
})
export class PageLoginComponent {

  constructor(
    private router: Router
  ) {}

  login(){
   this.router.navigate(["/utilisateurs"])
  }
}
