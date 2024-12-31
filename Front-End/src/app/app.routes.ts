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
import {AnalyseComponent} from './components/analyse/analyse.component';
import {EpreuveComponent} from './components/epreuve/epreuve.component';
import {DossierComponent} from './components/dossier/dossier.component';
import {ExaminComponent} from './components/examin/examin.component';

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
      { path: 'test-epreuves', component: TestEpreuveComponent },
      { path: 'epreuves', component: EpreuveComponent },
      { path: 'analyses', component: AnalyseComponent },
      { path: 'dossiers', component: DossierComponent },
      { path: 'examins', component: ExaminComponent },
    ]
  },
  { path: 'reset-password', component: ResetPasswordComponent },

  { path: '**', redirectTo: '' },
];


