import { Component, OnInit } from '@angular/core';
import { TestEpreuve } from '../../models/testEpreuve/test-epreuve.model';
import { TestEpreuveService } from '../../services/testEpreuveService/test-epreuve.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AjouterTestEpreuveComponent } from './ajouter-test-epreuve/ajouter-test-epreuve.component';
import { ModifierTestEpreuveComponent } from './modifier-test-epreuve/modifier-test-epreuve.component';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-test-epreuve',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconDirective,
  ],
  providers: [NzModalService, NzMessageService],
  templateUrl: './test-epreuve.component.html',
  styleUrls: ['./test-epreuve.component.css'],
})
export class TestEpreuveComponent implements OnInit {
  testEpreuves: TestEpreuve[] = [];
  loading: boolean = false;

  constructor(
    private testEpreuveService: TestEpreuveService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadTestEpreuves();
  }

  loadTestEpreuves(): void {
    this.loading = true;
    this.testEpreuveService.getAllTestEpreuves().subscribe({
      next: (data) => {
        this.testEpreuves = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.error('Failed to load test epreuves.');
      },
    });
  }

  openCreateForm(): void {
    const modal = this.modalService.create({
      nzTitle: 'Create New Test Epreuve',
      nzContent: AjouterTestEpreuveComponent,
      nzFooter: null,
    });

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadTestEpreuves();
      }
    });
  }

  openEditForm(testEpreuve: TestEpreuve): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit Test Epreuve',
      nzContent: ModifierTestEpreuveComponent,
      nzFooter: null,
    });

    if (modal.componentInstance instanceof ModifierTestEpreuveComponent) {
      modal.componentInstance.testEpreuve = testEpreuve;
    }

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadTestEpreuves();
      }
    });
  }

  deleteTestEpreuve(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this test epreuve?',
      nzOnOk: () =>
        this.testEpreuveService.deleteTestEpreuve(id).subscribe({
          next: () => {
            this.message.success('Test epreuve deleted successfully!');
            this.loadTestEpreuves();
          },
          error: () => {
            this.message.error('Failed to delete test epreuve.');
          },
        }),
    });
  }
}
