import { Laboratoire } from './../../models/laboratoire.model';
import { Component, OnInit } from '@angular/core';
import { LaboratoireService } from '../../services/laboratoireService/laboratoire.service';

import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzImageViewComponent } from 'ng-zorro-antd/experimental/image';
import { ModifierLaboratoireComponent } from './modifier-laboratoire/modifier-laboratoire.component';
import { AjouterLaboratoireComponent } from './ajouter-laboratoire/ajouter-laboratoire.component';
import { LaboratoireFormComponent } from './laboratoire-form/laboratoire-form.component';

@Component({
  selector: 'app-laboratoire',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzImageModule,
    NzDatePickerModule,
    NzTagModule,
    NzModalModule,
    NzButtonModule,
    NzImageViewComponent,
  ],
  templateUrl: './laboratoire.component.html',
  styleUrls: ['./laboratoire.component.css'],
})
export class LaboratoireComponent implements OnInit {
  laboratoires: Laboratoire[] = [];
  loading: boolean = false;

  constructor(
    private laboratoireService: LaboratoireService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadLaboratoires();
  }

  // Load laboratories from the service
  loadLaboratoires(): void {
    this.loading = true;
    this.laboratoireService.getLaboratoires().subscribe({
      next: (data) => {
        this.laboratoires = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.error('Failed to load laboratories.');
      },
    });
  }

  getLogoUrl(laboratoire: Laboratoire): string {
    const temp = laboratoire.logo;
    return temp ? 'data:image/png;base64,' + temp : '';
  }

  // Open the form for creating a new laboratory
  openCreateForm(): void {
    const modal = this.modalService.create({
      nzTitle: 'Create New Laboratory',
      nzContent: AjouterLaboratoireComponent,
      nzFooter: null,
    });

  // Handle modal close and refresh
  modal.afterClose.subscribe((result) => {
    if (result === 'success') {
      this.loadLaboratoires(); // Refresh the list
    }
  });
  }

  // Open the form for editing an existing laboratory
  openEditForm(laboratoire: Laboratoire): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit Laboratory',
      nzContent: ModifierLaboratoireComponent,
      nzFooter: null,
    });

    // Pass the laboratoire object to modal component
    if (modal.componentInstance instanceof ModifierLaboratoireComponent) {
      modal.componentInstance.laboratoire = laboratoire;
    }

  // Handle modal close and refresh
  modal.afterClose.subscribe((result) => {
    if (result === 'success') {
      this.loadLaboratoires(); // Refresh the list
    }
  });
  }

  // Delete a laboratory with confirmation
  deleteLaboratoire(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this laboratory?',
      nzOnOk: () =>
        this.laboratoireService.deleteLaboratoire(id).subscribe({
          next: () => {
            this.message.success('Laboratory deleted successfully!');
            this.loadLaboratoires();
          },
          error: () => {
            this.message.error('Failed to delete laboratory.');
          },
        }),
    });
  }
}
