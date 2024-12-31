import {Component, OnInit} from '@angular/core';

import { Utilisateur } from '../../models/utilisateur/utilisateur.model';
import {NzFilterTriggerComponent, NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {NgForOf, NgIf} from '@angular/common';
import {ModalOptions, NzModalComponent, NzModalContentDirective, NzModalService} from 'ng-zorro-antd/modal';
import {NzInputDirective} from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal'; // Import the NzModalModule

import {FormsModule} from '@angular/forms';
import {NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {UtilisateurService} from '../../services/utilisateurService/utilisateur.service';
import {AjouterUtilisateurComponent} from './ajouter-utilisateur/ajouter-utilisateur.component';
import {NzMessageService} from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import {ModifierUtilisateurComponent} from './modifier-utilisateur/modifier-utilisateur.component';
import {LaboratoireService} from '../../services/laboratoireService/laboratoire.service';
import {catchError, map, Observable, of} from 'rxjs';
import {LayoutComponent} from '../navigation/layout/layout.component';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {AuthService} from '../../services/AuthService/auth-service.service';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [
    NzTableComponent,
    NgForOf,
    NzModalComponent,
    NzInputDirective,
    FormsModule,
    NzModalContentDirective,
    NzModalModule,
    NzDropdownMenuComponent,
    NzButtonComponent,
    NzFilterTriggerComponent,
    NzThAddOnComponent,
    NzIconDirective,
    LayoutComponent,
    NgIf,
    NzSwitchComponent,


  ],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent implements OnInit {
  searchValue = '';
  visible = false;
  pageIndex = 1;
  paginatedData: Utilisateur[] = [];  // Les données affichées sur la page actuelle
  listOfData: Utilisateur[] = [];      // Liste complète des utilisateurs
  listOfDisplayData: Utilisateur[] = []; // Liste des utilisateurs affichés, filtrée si la recherche est appliquée
  laboratoireNames: { [key: number]: string } = {};
  role!: string | null;
  isArchived: boolean = false;

  constructor(
    private utilisateurService: UtilisateurService,
    private laboratoireService: LaboratoireService,
    private modal: NzModalService,
    private message: NzMessageService,
    private authService: AuthService,

  ) {}



  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.fetchUsers();
  }

  toggleArchived(): void {
    this.isArchived = !this.isArchived;
    this.fetchUsers();
  }

  // Méthode pour afficher le modal d'ajout d'utilisateur
  showAddUserModal(): void {
    const modalRef = this.modal.create({
      nzTitle: '',
      nzContent: AjouterUtilisateurComponent,
      nzFooter: null
    });

    modalRef.afterClose.subscribe((result) => {
      this.fetchUsers();
    });
  }

  // Méthode pour récupérer la liste des utilisateurs depuis le service
  // fetchUsers(): void {
  //   this.utilisateurService.getUtilisateurs().subscribe((data) => {
  //     this.listOfData = data;
  //
  //     this.listOfDisplayData = [...this.listOfData]; // Initialisation des données affichées
  //     this.listOfData.forEach(user => {
  //       this.getLaboratoireNom(user.laboratoireId);
  //     });
  //     this.updatePaginatedData();
  //   });
  // }

  // fetchUsers(): void {
  //   if (this.role === 'ADMINISTRATEUR') {
  //     // Récupérer tous les utilisateurs
  //     this.utilisateurService.getUtilisateurs().subscribe((data) => {
  //       this.listOfData = data;
  //       this.listOfDisplayData = [...this.listOfData];
  //       this.listOfData.forEach(user => {
  //               this.getLaboratoireNom(user.laboratoireId);
  //           });
  //       this.updatePaginatedData();
  //     });
  //   } else if (this.role === 'ADMIN_LABO') {
  //     const laboratoireId = this.authService.getLaboratoireId();
  //
  //     // Vérifiez si laboratoireId est null
  //     if (laboratoireId !== null) {
  //       this.utilisateurService.getUtilisateursByLaboratoire(laboratoireId).subscribe((data) => {
  //         this.listOfData = data;
  //         this.listOfDisplayData = [...this.listOfData];
  //         this.listOfData.forEach(user => {
  //           this.getLaboratoireNom(user.laboratoireId);
  //         });
  //         this.updatePaginatedData();
  //       });
  //     } else {
  //       // Gérer le cas où laboratoireId est null
  //       this.message.create('error', 'Laboratoire non trouvé. Veuillez vous reconnecter.');
  //     }
  //   }
  // }

  fetchUsers(): void {
    if (this.role === 'ADMINISTRATEUR') {
      if (this.isArchived) {
        this.utilisateurService.getUtilisateursArchives().subscribe((data) => {
          this.listOfData = data;
          this.listOfDisplayData = [...this.listOfData];
          this.listOfData.forEach(user => {
            this.getLaboratoireNom(user.laboratoireId);
          });
          this.updatePaginatedData();
        });
      } else {
        this.utilisateurService.getUtilisateursNonArchives().subscribe((data) => {
          this.listOfData = data;
          this.listOfDisplayData = [...this.listOfData];
          this.listOfData.forEach(user => {
            this.getLaboratoireNom(user.laboratoireId);
          });
          this.updatePaginatedData();
        });
      }
    } else if (this.role === 'ADMIN_LABO') {
      const laboratoireId = this.authService.getLaboratoireId();
      if (laboratoireId !== null) {
        if (this.isArchived) {
          this.utilisateurService.getUtilisateursArchives().subscribe((data) => {
            this.listOfData = data.filter((user) => user.laboratoireId === laboratoireId);
            this.listOfDisplayData = [...this.listOfData];
            this.listOfData.forEach(user => {
              this.getLaboratoireNom(user.laboratoireId);
            });
            this.updatePaginatedData();
          });
        } else {
          this.utilisateurService.getUtilisateursNonArchives().subscribe((data) => {
            this.listOfData = data.filter((user) => user.laboratoireId === laboratoireId);
            this.listOfDisplayData = [...this.listOfData];
            this.listOfData.forEach(user => {
              this.getLaboratoireNom(user.laboratoireId);
            });
            this.updatePaginatedData();
          });
        }
      } else {
        this.message.create('error', 'Laboratoire non trouvé. Veuillez vous reconnecter.');
      }
    }
  }


  getLaboratoireNom(laboratoireId?: number): void {
    if (laboratoireId === undefined) {
      this.laboratoireNames[laboratoireId!] = 'Non affecté'; // Use non-null assertion operator
      return;
    }
    this.laboratoireService.getLaboratoireById(laboratoireId).pipe(
      map(laboratoire => laboratoire.nom),
      catchError(() => of('Non affecté'))
    ).subscribe(name => {
      this.laboratoireNames[laboratoireId] = name; // Only set if laboratoireId is defined
    });
  }

  // Met à jour `paginatedData` pour afficher les utilisateurs de la page actuelle
  updatePaginatedData(): void {
    const startIndex = (this.pageIndex - 1) * 5;
    this.paginatedData = this.listOfDisplayData.slice(startIndex, startIndex + 5);
  }

  // Réinitialise la recherche
  reset(): void {
    this.searchValue = '';
    this.applyFilter();
  }

  // Filtre les utilisateurs en fonction de la recherche
  search(): void {
    this.applyFilter();
  }

  // Applique la recherche sur les utilisateurs et met à jour la pagination
  applyFilter(): void {
    this.listOfDisplayData = this.listOfData.filter((user: Utilisateur) =>
      user.email.toLowerCase().includes(this.searchValue.toLowerCase())
    );
    this.pageIndex = 1;
    this.updatePaginatedData();
  }



  // Méthode pour modifier un utilisateur

  editUser(userId: number | undefined): void {
    if (userId !== undefined) {
      this.utilisateurService.getUtilisateurById(userId).subscribe((user) => {
        const newUser = { ...user } ;


        const modalRef = this.modal.create({
          nzTitle: 'Modifier Utilisateur',
          nzContent: ModifierUtilisateurComponent,
          nzFooter: null,
        });


        if (modalRef.componentInstance instanceof ModifierUtilisateurComponent) {
          modalRef.componentInstance.newUser = newUser;
        }

        // Subscribe to modal close event
        modalRef.afterClose.subscribe((result) => {
          if (result === 'success') {
            this.message.success('Utilisateur modifié avec succès');
            this.fetchUsers();
          }
        });
      });
    }
  }


  // Méthode pour supprimer un utilisateur
  deleteUser(userId: number | undefined): void {
    if (userId !== undefined) {
      this.modal.confirm({
        nzTitle: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
        nzContent: 'Cette action est irréversible.',
        nzOnOk: () => {
          this.utilisateurService.deleteUtilisateur(userId).subscribe({
            next: () => {
              this.message.create('success', 'Utilisateur supprimé avec succès.');
              this.fetchUsers();
            },
            error: () => {
              this.message.create('error', 'Échec de la suppression de l\'utilisateur.');
            }
          });
        }
      });
    }
  }

  unarchiveUser(userId: number | undefined): void {
    if (userId === undefined) {
      this.message.create('error', 'ID utilisateur invalide.');
      return;
    }

    this.modal.confirm({
      nzTitle: 'Confirmer le désarchivage',
      nzContent: 'Êtes-vous sûr de vouloir désarchiver cet utilisateur ?',
      nzOkText: 'Oui',
      nzCancelText: 'Non',
      nzOnOk: () => {
        this.utilisateurService.unarchiveUtilisateur(userId).subscribe({
          next: (utilisateur) => {
            this.message.create('success', `Utilisateur ${utilisateur.nom} désarchivé avec succès.`);
            this.fetchUsers();
          },
          error: (err) => {
            this.message.create('error', 'Erreur lors du désarchivage de l\'utilisateur.');
            console.error('Erreur:', err);
          }
        });
      }
    });
  }


  archiveUser (userId: number | undefined): void {
    if (userId !== undefined) {
      this.modal.confirm({
        nzTitle: 'Êtes-vous sûr de vouloir archiver cet utilisateur ?',
        nzContent: 'Cette action ne peut pas être annulée.',
        nzOnOk: () => {
          this.utilisateurService.archiveUtilisateur(userId).subscribe({
            next: () => {
              this.message.create('success', 'Utilisateur archivé avec succès.');
              this.fetchUsers();
            },
            error: () => {
              this.message.create('error', 'Échec de l\'archivage de l\'utilisateur.');
            }
          });
        }
      });
    }
  }
}
