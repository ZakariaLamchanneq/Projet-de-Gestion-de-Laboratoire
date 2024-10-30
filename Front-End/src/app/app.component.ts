import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // RouterModule,
    NavbarComponent,

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Gestion Laboratoire';
}
