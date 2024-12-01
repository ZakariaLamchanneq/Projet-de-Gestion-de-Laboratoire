import { Routes } from '@angular/router';
import { LaboratoireFormComponent } from './components/laboratoire/laboratoire-form/laboratoire-form.component';
import {UtilisateurComponent} from './components/utilisateur/utilisateur.component';
import { LaboratoireComponent } from './components/laboratoire/laboratoire.component';
import {PatientComponent} from './components/patient/patient.component';
import {PageLoginComponent} from './components/page-login/page-login.component';
import {LayoutComponent} from './components/navigation/layout/layout.component';
import {AuthGuard} from './services/AuthService/AuthGuard';

export const routes: Routes = [
  // Redirect the root to /home
  // { path: '', redirectTo: 'laboratoires', pathMatch: 'full' },

  // Optionally add a wildcard route for unknown paths
  { path: 'login',  component: PageLoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'laboratoires',  component: LaboratoireComponent },
      { path: 'utilisateurs', component: UtilisateurComponent  },
      { path: 'patients', component: PatientComponent},
    ]
  },

  { path: '**', redirectTo: '' },
];


