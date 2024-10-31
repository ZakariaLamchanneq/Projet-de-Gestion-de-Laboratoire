import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from "./components/navigation/layout/layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // RouterModule,
    LayoutComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Gestion Laboratoire';
}
