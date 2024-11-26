import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { LayoutComponent } from "./components/navigation/layout/layout.component";
import {PageLoginComponent} from './components/page-login/page-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // RouterModule,
    LayoutComponent,
    PageLoginComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Gestion Laboratoire';
}
