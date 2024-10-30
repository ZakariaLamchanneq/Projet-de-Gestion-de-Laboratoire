import { Routes } from '@angular/router';
import { LaboratoireListComponent } from './components/laboratoire/laboratoire-list/laboratoire-list.component';
import { LaboratoireFormComponent } from './components/laboratoire/laboratoire-form/laboratoire-form.component';
import {UtilisateurComponent} from './components/utilisateur/utilisateur.component';

export const routes: Routes = [
  // Redirect the root to /home
  // { path: '', redirectTo: 'laboratoires', pathMatch: 'full' },

  {
    path: '',
    children: [
      { path: 'laboratoires', component: LaboratoireListComponent },
      { path: 'create-laboratoire', component: LaboratoireFormComponent },
    ],


  },
  { path: 'utilisateurs',  component: UtilisateurComponent },
  // Optionally add a wildcard route for unknown paths
  { path: '**', redirectTo: '' }
];


