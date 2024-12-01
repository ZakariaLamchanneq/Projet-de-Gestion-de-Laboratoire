import { Component, OnInit } from '@angular/core';
import { ContactLaboratoire } from '../../models/contactLaboratoire/contact-laboratoire.model';
import { ContactLaboratoireService } from '../../services/contactLaboratoireService/contact-laboratoire.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AjouterContactLaboratoireComponent } from './ajouter-contact-laboratoire/ajouter-contact-laboratoire.component';
import { ModifierContactLaboratoireComponent } from './modifier-contact-laboratoire/modifier-contact-laboratoire.component';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-contact-laboratoire',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconDirective,
  ],
  providers: [NzModalService, NzMessageService],
  templateUrl: './contact-laboratoire.component.html',
  styleUrls: ['./contact-laboratoire.component.css'],
})
export class ContactLaboratoireComponent implements OnInit {
  contacts: ContactLaboratoire[] = [];
  loading: boolean = false;

  constructor(
    private contactLaboratoireService: ContactLaboratoireService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true;
    this.contactLaboratoireService.getAllContactsLaboratoire().subscribe({
      next: (data) => {
        this.contacts = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.error('Failed to load contacts.');
      },
    });
  }

  openCreateForm(): void {
    const modal = this.modalService.create({
      nzTitle: 'Create New Contact',
      nzContent: AjouterContactLaboratoireComponent,
      nzFooter: null,
    });

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadContacts();
      }
    });
  }

  openEditForm(contact: ContactLaboratoire): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit Contact',
      nzContent: ModifierContactLaboratoireComponent,
      nzFooter: null,
    });

    if (modal.componentInstance instanceof ModifierContactLaboratoireComponent) {
      modal.componentInstance.contact = contact;
    }

    modal.afterClose.subscribe((result) => {
      if (result === 'success') {
        this.loadContacts();
      }
    });
  }

  deleteContact(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this contact?',
      nzOnOk: () =>
        this.contactLaboratoireService.deleteContactLaboratoire(id).subscribe({
          next: () => {
            this.message.success('Contact deleted successfully!');
            this.loadContacts();
          },
          error: () => {
            this.message.error('Failed to delete contact.');
          },
        }),
    });
  }
}
