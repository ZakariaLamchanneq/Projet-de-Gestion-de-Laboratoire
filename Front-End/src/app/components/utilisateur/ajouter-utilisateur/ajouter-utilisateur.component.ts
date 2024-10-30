import {Component, OnInit, Output} from '@angular/core';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {Utilisateur} from '../../../models/utilisateur.model';
import {UtilisateurService} from '../../../services/utilisateurService/utilisateur.service';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzDropDownDirective, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Laboratoire} from '../../../models/laboratoire.model';
import {LaboratoireService} from '../../../services/laboratoireService/laboratoire.service';
import {NgForOf} from '@angular/common';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';


@Component({
  selector: 'app-ajouter-utilisateur',
  standalone: true,
  imports: [
    NzInputDirective,
    FormsModule,
    NzButtonComponent,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzIconDirective,
    NzDropDownDirective,
    NzInputGroupComponent,
    NgForOf,
    NzOptionComponent,
    NzSelectComponent
  ],
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrl: './ajouter-utilisateur.component.css'
})
export class AjouterUtilisateurComponent implements OnInit{

  laboratoires: Laboratoire[] = [];


  ngOnInit(): void {
    this.fetchLaboratoires();
  }

  newUser: Utilisateur = {
    email: '',
    nomComplet: '',
    profession: '',
    numTel: '',
    signature: '',
    role: '',
    laboratoireId:0,
  };

  constructor(
    private utilisateurService: UtilisateurService,
    private laboratoireService: LaboratoireService,
    private modalRef: NzModalRef,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  fetchLaboratoires(): void {
    this.laboratoireService.getLaboratoires().subscribe(
      (data) => {
        this.laboratoires = data;
      },
      (error) => {
        this.notification.error('error','Erreur lors de la récupération des laboratoires');
      }
    );
  }
  handleOk(): void {
    this.utilisateurService.createUtilisateur(this.newUser).subscribe((createdUser) => {
      this.notification.success('Succès', 'Utilisateur ajouté avec succès!');

      // Emit the event with the newly created user data
    this.router.navigate(["/utilisateurs"]);

      // Close the modal
      this.modalRef.close();
    });
  }

  handleCancel(): void {
    this.modalRef.close();
  }


}
