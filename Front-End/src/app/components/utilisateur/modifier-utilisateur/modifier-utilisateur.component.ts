import {Component, Input, OnInit} from '@angular/core';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzMessageService} from 'ng-zorro-antd/message';
import {UtilisateurService} from '../../../services/utilisateurService/utilisateur.service';
import {Utilisateur} from '../../../models/utilisateur/utilisateur.model';
import {NgIf} from '@angular/common';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modifier-utilisateur',
  standalone: true,
  imports: [
    NzIconDirective,
    NzInputDirective,
    FormsModule,
    NzButtonComponent,
    NgIf
  ],
  templateUrl: './modifier-utilisateur.component.html',
  styleUrl: './modifier-utilisateur.component.css'
})
export class ModifierUtilisateurComponent implements OnInit{
  @Input() newUser?: Utilisateur;


  ngOnInit(): void {
    console.log('Modifier User:', this.newUser);  // Check if newUser is available
  }


  constructor(
    private utilisateurService: UtilisateurService,
    private message: NzMessageService,
    private router: Router,
    private modalRef: NzModalRef,

  ) {}

  handleCancel(): void {
    // Close modal without any action
  }

  handleOk(): void {
    if (this.newUser) {
      this.utilisateurService.updateUtilisateur(this.newUser.id, this.newUser).subscribe(
        () => {

          this.router.navigate(["/utilisateurs"]);


          this.modalRef.close('success');
        },
        (error) => {
          this.message.error("Échec de la modification de l'utilisateur");
        }
      );
    }
  }
}
