import {Component, OnInit} from '@angular/core';
import {TestEpreuveModel} from '../../models/test-epreuve/test-epreuve.model';
import {TestEpreuveService} from '../../services/testEpreuveService/test-epreuve.service';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzFilterTriggerComponent, NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {AddTestEpreuveComponent} from './ajouter-test-epreuve/ajouter-test-epreuve.component';
import {ModifierTestEpreuveComponent} from './modifier-test-epreuve/modifier-test-epreuve.component';
import {FormsModule} from '@angular/forms';
import {NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-test-epreuve',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NzButtonComponent,
    NzDropdownMenuComponent,
    NzFilterTriggerComponent,
    NzIconDirective,
    NzInputDirective,
    NzTableComponent,
    NzModalModule,
    NzThAddOnComponent,
    DatePipe,
    NgIf,
    NzTagComponent
  ],
  templateUrl: './test-epreuve.component.html',
  styleUrl: './test-epreuve.component.css'
})

export class TestEpreuveComponent implements OnInit {
  pageIndex = 1;
  listOfData: TestEpreuveModel[] = [];
  listOfDisplayData: TestEpreuveModel[] = [];
  paginatedData: TestEpreuveModel[] = [];

  constructor(
    private testEpreuveService: TestEpreuveService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.fetchTestEpreuves();
  }

  fetchTestEpreuves(): void {
    this.testEpreuveService.getTestEpreuves().subscribe((data) => {
      this.listOfData = data;
      this.listOfDisplayData = [...this.listOfData];
      this.updatePaginatedData();
    });
  }

  updatePaginatedData(): void {
    const startIndex = (this.pageIndex - 1) * 5;
    this.paginatedData = this.listOfDisplayData.slice(startIndex, startIndex + 5);
  }

  showAddTestEpreuveModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Ajouter une Épreuve',
      nzContent: AddTestEpreuveComponent,
      nzFooter: null
    });

    modalRef.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.message.success('Épreuve ajoutée avec succès');
        this.fetchTestEpreuves();
      }
    });
  }

  editTestEpreuve(testEpreuveId: number | undefined): void {
    if (testEpreuveId !== undefined) {
      this.testEpreuveService.getTestEpreuveById(testEpreuveId).subscribe((testEpreuve) => {
        const newTestEpreuve = { ...testEpreuve };

        const modalRef = this.modal.create({
          nzTitle: 'Modifier Épreuve',
          nzContent: ModifierTestEpreuveComponent,
          nzFooter: null
        });

        if (modalRef.componentInstance instanceof ModifierTestEpreuveComponent) {
          modalRef.componentInstance.testEpreuve = newTestEpreuve;
        }

        modalRef.afterClose.subscribe((result) => {
          if (result === 'success') {
            this.message.success('Épreuve modifiée avec succès');
            this.fetchTestEpreuves();
          }
        });
      });
    }
  }

  deleteTestEpreuve(testEpreuveId: number | undefined): void {
    if (testEpreuveId !== undefined) {
      this.modal.confirm({
        nzTitle: 'Êtes-vous sûr de vouloir supprimer cette épreuve ?',
        nzContent: 'Cette action est irréversible.',
        nzOnOk: () => {
          this.testEpreuveService.deleteTestEpreuve(testEpreuveId).subscribe({
            next: () => {
              this.message.success('Épreuve supprimée avec succès.');
              this.fetchTestEpreuves();
            },
            error: () => {
              this.message.error('Échec de la suppression de l\'épreuve.');
            }
          });
        }
      });
    }
  }
}
