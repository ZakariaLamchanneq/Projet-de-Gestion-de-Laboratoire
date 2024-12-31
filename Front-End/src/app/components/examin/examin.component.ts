import { Component, OnInit } from '@angular/core';
import { ExaminService } from '../../services/examinService/examin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { AjouterExaminComponent } from './ajouter-examin/ajouter-examin.component';
import { ModifierExaminComponent } from './modifier-examin/modifier-examin.component';

@Component({
  selector: 'app-examin',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconDirective,
  ],
  providers: [NzModalService, NzMessageService],
  templateUrl: './examin.component.html',
  styleUrls: ['./examin.component.css'],
})
export class ExaminComponent implements OnInit {
  examins: any[] = [];
  loading: boolean = false;

  constructor(
    private examinService: ExaminService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadExamin();
  }

  loadExamin(): void {
    this.loading = true;
    this.examinService.getAllExamins().subscribe({
      next: (data) => {
        this.examins = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.error('Failed to load examins.');
      },
    });
  }

  openCreateForm(): void {
    const modal = this.modalService.create({
      nzTitle: 'Create New Examin',
      nzContent: AjouterExaminComponent,
      nzFooter: null,
    });

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadExamin();
      }
    });
  }

  openEditForm(examin: any): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit Examin',
      nzContent: ModifierExaminComponent,
      nzFooter: null,
    });

    if (modal.componentInstance instanceof ModifierExaminComponent) {
      modal.componentInstance.examin = examin;
    }

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadExamin();
      }
    });
  }

  deleteExamin(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this examin?',
      nzOnOk: () =>
        this.examinService.deleteExamin(id).subscribe({
          next: () => {
            this.message.success('Examin deleted successfully!');
            this.loadExamin();
          },
          error: () => {
            this.message.error('Failed to delete examin.');
          },
        }),
    });
  }
}
