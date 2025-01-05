import { Component, OnInit } from '@angular/core';
import { DossierService } from '../../services/dossierService/dossier.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { AjouterDossierComponent } from './ajouter-dossier/ajouter-dossier.component';
import { ModifierDossierComponent } from './modifier-dossier/modifier-dossier.component';
import {ConsultDossierComponent} from '../consult-dossier/consult-dossier.component';

@Component({
  selector: 'app-dossier',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconDirective,
  ],
  providers: [NzModalService, NzMessageService],
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.css'],
})
export class DossierComponent implements OnInit {
  dossiers: any[] = [];
  loading: boolean = false;

  constructor(
    private dossierService: DossierService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadDossiers();
  }

  loadDossiers(): void {
    this.loading = true;
    this.dossierService.getAllDossiers().subscribe({
      next: (data) => {
        this.dossiers = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.error('Failed to load dossiers.');
      },
    });
  }

  openCreateForm(): void {
    const modal = this.modalService.create({
      nzTitle: 'Create New Dossier',
      nzContent: AjouterDossierComponent,
      nzFooter: null,
    });

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadDossiers();
      }
    });
  }

  openEditForm(dossier: any): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit Dossier',
      nzContent: ModifierDossierComponent,
      nzFooter: null,
    });

    if (modal.componentInstance instanceof ModifierDossierComponent) {
      modal.componentInstance.dossier = dossier;
    }

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadDossiers();
      }
    });
  }

  deleteDossier(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this dossier?',
      nzOnOk: () =>
        this.dossierService.deleteDossier(id).subscribe({
          next: () => {
            this.message.success('Dossier deleted successfully!');
            this.loadDossiers();
          },
          error: () => {
            this.message.error('Failed to delete dossier.');
          },
        }),
    });
  }

  openConsultModal(numDossier: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Consult Dossier',
      nzContent: ConsultDossierComponent,
      nzFooter: null,
      nzWidth: '80%'
    });

    const instance = modal.getContentComponent();
    if (instance) {
      instance.numDossier = numDossier;
    }

    modal.afterClose.subscribe(result => {
      if (result === 'success') {
        this.loadDossiers();
      }
    });
  }
}
