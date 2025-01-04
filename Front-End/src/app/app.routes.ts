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
import {ProfileComponent} from './components/profile/profile.component';
import {StatistiqueComponent} from './components/statistique/statistique.component';
import {Error403Component} from './components/result/error-403/error-403.component';
import {Error404Component} from './components/result/error-404/error-404.component';

export const routes: Routes = [
  // Redirect the root to /home
  // { path: '', redirectTo: 'laboratoires', pathMatch: 'full' },

  // Optionally add a wildcard route for unknown paths
  { path: 'login',  component: PageLoginComponent },
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: 'laboratoires',  component: LaboratoireComponent },
  //     { path: 'utilisateurs', component: UtilisateurComponent ,canActivate: [AuthGuard], data: { roles: ['ADMINISTRATEUR', 'ADMIN_LABO'] }  },
  //     { path: 'patients', component: PatientComponent},
  //     { path: 'adresses', component: AdresseComponent },
  //     { path: 'contacts-laboratoire', component: ContactLaboratoireComponent },
  //     { path: 'test-epreuves', component: TestEpreuveComponent },
  //     { path: 'epreuves', component: EpreuveComponent },
  //     { path: 'analyses', component: AnalyseComponent },
  //     { path: 'dossiers', component: DossierComponent },
  //     { path: 'examins', component: ExaminComponent },
  //     { path: 'profile', component: ProfileComponent },
  //     { path: 'home', component: StatistiqueComponent,}
  //   ]
  // },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // Management routes
      {
        path: 'home',
        component: StatistiqueComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRATEUR', 'ADMIN_LABO'] }
      },
      {
        path: 'utilisateurs',
        component: UtilisateurComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRATEUR', 'ADMIN_LABO'] }
      },
      {
        path: 'laboratoires',
        component: LaboratoireComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRATEUR'] }
      },
      {
        path: 'contacts-laboratoire',
        component: ContactLaboratoireComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRATEUR'] }
      },

      // Patient Management routes
      {
        path: 'patients',
        component: PatientComponent,
        canActivate: [AuthGuard],
        data: { roles: ['TECHNICIEN', 'ADMINISTRATEUR', 'ADMIN_LABO'] }
      },
      {
        path: 'dossiers',
        component: DossierComponent,
        canActivate: [AuthGuard],
        data: { roles: ['TECHNICIEN', 'ADMINISTRATEUR', 'ADMIN_LABO'] }
      },
      {
        path: 'examins',
        component: ExaminComponent,
        canActivate: [AuthGuard],
        data: { roles: ['TECHNICIEN', 'ADMINISTRATEUR', 'ADMIN_LABO'] }
      },

      // Tests & Analyses routes
      {
        path: 'test-epreuves',
        component: TestEpreuveComponent,
        canActivate: [AuthGuard],
        data: { roles: ['TECHNICIEN', 'ADMINISTRATEUR', 'ADMIN_LABO'] }
      },
      {
        path: 'epreuves',
        component: EpreuveComponent,
        canActivate: [AuthGuard],
        data: { roles: ['TECHNICIEN', 'ADMINISTRATEUR', 'ADMIN_LABO'] }
      },
      {
        path: 'analyses',
        component: AnalyseComponent,
        canActivate: [AuthGuard],
        data: { roles: ['TECHNICIEN', 'ADMINISTRATEUR', 'ADMIN_LABO'] }
      },

      // Other routes
      {
        path: 'adresses',
        component: AdresseComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRATEUR', 'ADMIN_LABO'] }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: ['TECHNICIEN', 'ADMIN_LABO'] }
      }
    ]
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'not-authorized', component: Error403Component },
  { path: 'error-404',  component: Error404Component },

  // { path: '**', redirectTo: 'login' },
  { path: '**', redirectTo: 'error-404' },


];


