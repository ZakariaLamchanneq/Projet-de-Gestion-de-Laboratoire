import { Component, OnInit } from '@angular/core';
import { Laboratoire } from '../../../models/laboratoire.model';
import { LaboratoireService } from '../../../services/laboratoireService/laboratoire.service';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table'; // Import NG-ZORRO table module
import { NzImageModule } from 'ng-zorro-antd/image'; // Import NG-ZORRO image module
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'; // Import date picker if needed

@Component({
  selector: 'app-laboratoire-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzImageModule, NzDatePickerModule],
  templateUrl: './laboratoire-list.component.html',
  styleUrl: './laboratoire-list.component.css',
})
export class LaboratoireListComponent implements OnInit {
  laboratoires: Laboratoire[] = [];

  constructor(private laboratoireService: LaboratoireService) {}

  ngOnInit(): void {
    this.laboratoireService.getLaboratoires().subscribe((data) => {
      this.laboratoires = data;
    });
  }
}
