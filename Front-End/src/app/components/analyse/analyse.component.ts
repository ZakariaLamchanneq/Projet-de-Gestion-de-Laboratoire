import { Component, OnInit } from '@angular/core';
import { Analyse } from '../../models/analyse/analyse.model';
import { AnalyseService } from '../../services/analyseService/analyse.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AjouterAnalyseComponent } from './ajouter-analyse/ajouter-analyse.component';
import { ModifierAnalyseComponent } from './modifier-analyse/modifier-analyse.component';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-analyse',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconDirective,
  ],
  providers: [NzModalService, NzMessageService],
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css'],
})
export class AnalyseComponent implements OnInit {
  analyses: Analyse[] = [];
  loading: boolean = false;

  constructor(
    private analyseService: AnalyseService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadAnalyses();
  }

  loadAnalyses(): void {
    this.loading = true;
    this.analyseService.getAllAnalyses().subscribe({
      next: (data) => {
        this.analyses = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.error('Failed to load analyses.');
      },
    });
  }

  openCreateForm(): void {
    const modal = this.modalService.create({
      nzTitle: 'Create New Analyse',
      nzContent: AjouterAnalyseComponent,
      nzFooter: null,
    });

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadAnalyses();
      }
    });
  }

  openEditForm(analyse: Analyse): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit Analyse',
      nzContent: ModifierAnalyseComponent,
      nzFooter: null,
    });

    if (modal.componentInstance instanceof ModifierAnalyseComponent) {
      modal.componentInstance.analyse = analyse;
    }

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadAnalyses();
      }
    });
  }

  deleteAnalyse(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this analyse?',
      nzOnOk: () =>
        this.analyseService.deleteAnalyse(id).subscribe({
          next: () => {
            this.message.success('Analyse deleted successfully!');
            this.loadAnalyses();
          },
          error: () => {
            this.message.error('Failed to delete analyse.');
          },
        }),
    });
  }
}
