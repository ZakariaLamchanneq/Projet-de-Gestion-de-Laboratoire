import { Routes } from '@angular/router';
import { LaboratoireFormComponent } from './components/laboratoire/laboratoire-form/laboratoire-form.component';
import {UtilisateurComponent} from './components/utilisateur/utilisateur.component';
import { LaboratoireComponent } from './components/laboratoire/laboratoire.component';
import {PatientComponent} from './components/patient/patient.component';

export const routes: Routes = [
  // Redirect the root to /home
  // { path: '', redirectTo: 'laboratoires', pathMatch: 'full' },

  // Optionally add a wildcard route for unknown paths
  { path: 'laboratoires',  component: LaboratoireComponent },
  { path: 'utilisateurs',  component: UtilisateurComponent },
  { path: 'patients', component: PatientComponent},
  { path: '**', redirectTo: '' },
];


