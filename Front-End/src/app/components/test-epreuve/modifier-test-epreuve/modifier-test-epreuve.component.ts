import {Component, Input} from '@angular/core';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {TestEpreuveModel} from '../../../models/test-epreuve/test-epreuve.model';
import {TestEpreuveService} from '../../../services/testEpreuveService/test-epreuve.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-modifier-test-epreuve',
  standalone: true,
  imports: [
    NzIconDirective,
    NzInputDirective,
    NgIf,
    FormsModule
  ],
  templateUrl: './modifier-test-epreuve.component.html',
  styleUrl: './modifier-test-epreuve.component.css'
})
export class ModifierTestEpreuveComponent {
  @Input() testEpreuve?: TestEpreuveModel;

  constructor(
    private testEpreuveService: TestEpreuveService,
    private message: NzMessageService,
    private router: Router,
    private modalRef: NzModalRef
  ) {}

  handleCancel(): void {
    this.modalRef.close();
  }

  handleOk(): void {
    if (this.testEpreuve) {
      this.testEpreuveService.updateTestEpreuve(this.testEpreuve.id, this.testEpreuve).subscribe(
        () => {
          this.router.navigate(['/test-epreuves']);
          this.modalRef.close('success');
        },
        (error) => {
          this.message.error("Échec de la modification du test épreuve");
        }
      );
    }
  }

  closeModal(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.handleCancel();
    }
  }
}
