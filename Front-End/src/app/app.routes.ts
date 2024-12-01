import { Routes } from '@angular/router';
import {UtilisateurComponent} from './components/utilisateur/utilisateur.component';
import { LaboratoireComponent } from './components/laboratoire/laboratoire.component';
import {PatientComponent} from './components/patient/patient.component';
import {PageLoginComponent} from './components/page-login/page-login.component';
import {LayoutComponent} from './components/navigation/layout/layout.component';
import {AdresseComponent} from './components/adresse/adresse.component';
import {ContactLaboratoireComponent} from './components/contact-laboratoire/contact-laboratoire.component';

export const routes: Routes = [
  // Redirect the root to /home
  // { path: '', redirectTo: 'laboratoires', pathMatch: 'full' },

  // Optionally add a wildcard route for unknown paths
  { path: 'login',  component: PageLoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'laboratoires',  component: LaboratoireComponent },
      { path: 'utilisateurs', component: UtilisateurComponent } ,
      { path: 'patients', component: PatientComponent},
      { path: 'adresses', component: AdresseComponent },
      { path: 'contacts-laboratoire', component: ContactLaboratoireComponent },
    ]
  },

  { path: '**', redirectTo: '' },
];


