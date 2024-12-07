import { Component, OnInit } from '@angular/core';
import { Adresse } from '../../models/adresse/adresse.model';
import { AdresseService } from '../../services/adresseService/adresse.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AjouterAdresseComponent } from './ajouter-adresse/ajouter-adresse.component';
import { ModifierAdresseComponent } from './modifier-adresse/modifier-adresse.component';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-adresse',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconDirective,
  ],
  providers: [NzModalService, NzMessageService], // Add providers here
  templateUrl: './adresse.component.html',
  styleUrls: ['./adresse.component.css'],
})
export class AdresseComponent implements OnInit {
  adresses: Adresse[] = [];
  loading: boolean = false;

  constructor(
    private adresseService: AdresseService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadAdresses();
  }

  loadAdresses(): void {
    this.loading = true;
    this.adresseService.getAllAdresses().subscribe({
      next: (data) => {
        this.adresses = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.error('Failed to load addresses.');
      },
    });
  }

  openCreateForm(): void {
    const modal = this.modalService.create({
      nzTitle: 'Create New Address',
      nzContent: AjouterAdresseComponent,
      nzFooter: null,
    });

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadAdresses();
      }
    });
  }

  openEditForm(adresse: Adresse): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit Address',
      nzContent: ModifierAdresseComponent,
      nzFooter: null,
    });

    if (modal.componentInstance instanceof ModifierAdresseComponent) {
      modal.componentInstance.adresse = adresse;
    }

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadAdresses();
      }
    });
  }

  deleteAdresse(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this address?',
      nzOnOk: () =>
        this.adresseService.deleteAdresse(id).subscribe({
          next: () => {
            this.message.success('Address deleted successfully!');
            this.loadAdresses();
          },
          error: () => {
            this.message.error('Failed to delete address.');
          },
        }),
    });
  }
}
