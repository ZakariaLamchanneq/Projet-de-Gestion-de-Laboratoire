import { Routes } from '@angular/router';
import {UtilisateurComponent} from './components/utilisateur/utilisateur.component';
import { LaboratoireComponent } from './components/laboratoire/laboratoire.component';
import {PatientComponent} from './components/patient/patient.component';
import {PageLoginComponent} from './components/page-login/page-login.component';
import {LayoutComponent} from './components/navigation/layout/layout.component';
import {AdresseComponent} from './components/adresse/adresse.component';
import {ContactLaboratoireComponent} from './components/contact-laboratoire/contact-laboratoire.component';
import {AuthGuard} from './services/AuthService/AuthGuard';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {TestEpreuveComponent} from './components/test-epreuve/test-epreuve.component';
import {ProfileComponent} from './components/profile/profile.component';

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
      { path: 'adresses', component: AdresseComponent },
      { path: 'contacts-laboratoire', component: ContactLaboratoireComponent },
      { path: 'test-epreuve', component: TestEpreuveComponent},
      { path: 'profile', component: ProfileComponent },
    ]
  },
  { path: 'reset-password', component: ResetPasswordComponent },


  { path: '**', redirectTo: 'login' },
];


