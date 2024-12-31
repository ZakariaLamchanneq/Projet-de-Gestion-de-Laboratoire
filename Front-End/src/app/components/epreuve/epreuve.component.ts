import { Component, OnInit } from '@angular/core';
import { Epreuve } from '../../models/epreuve/epreuve.model';
import { EpreuveService } from '../../services/epreuveService/epreuve.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AjouterEpreuveComponent } from './ajouter-epreuve/ajouter-epreuve.component';
import { ModifierEpreuveComponent } from './modifier-epreuve/modifier-epreuve.component';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-epreuve',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconDirective,
  ],
  providers: [NzModalService, NzMessageService],
  templateUrl: './epreuve.component.html',
  styleUrls: ['./epreuve.component.css'],
})
export class EpreuveComponent implements OnInit {
  epreuves: Epreuve[] = [];
  loading: boolean = false;

  constructor(
    private epreuveService: EpreuveService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadEpreuves();
  }

  loadEpreuves(): void {
    this.loading = true;
    this.epreuveService.getAllEpreuves().subscribe({
      next: (data) => {
        this.epreuves = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.error('Failed to load epreuves.');
      },
    });
  }

  openCreateForm(): void {
    const modal = this.modalService.create({
      nzTitle: 'Create New Epreuve',
      nzContent: AjouterEpreuveComponent,
      nzFooter: null,
    });

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadEpreuves();
      }
    });
  }

  openEditForm(epreuve: Epreuve): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit Epreuve',
      nzContent: ModifierEpreuveComponent,
      nzFooter: null,
    });

    if (modal.componentInstance instanceof ModifierEpreuveComponent) {
      modal.componentInstance.epreuve = epreuve;
    }

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadEpreuves();
      }
    });
  }

  deleteEpreuve(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this epreuve?',
      nzOnOk: () =>
        this.epreuveService.deleteEpreuve(id).subscribe({
          next: () => {
            this.message.success('Epreuve deleted successfully!');
            this.loadEpreuves();
          },
          error: () => {
            this.message.error('Failed to delete epreuve.');
          },
        }),
    });
  }
}
