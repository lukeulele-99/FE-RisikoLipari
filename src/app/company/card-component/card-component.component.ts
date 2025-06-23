import { Component, Input, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';
import { CompanyModel } from '../../model/Company';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../model/Employee';
import { stat } from 'fs';

@Component({
  selector: 'app-card-component',
  imports: [CommonModule],
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.css'
})
export class CardComponentComponent {

  @Input() companyId: number | null = null;

  company?: CompanyModel

  visible: boolean = false;

  @Input() roleStats!: {
    [key: string]: { totali: number; staffati: number; disponibili: number };
  };


  constructor(private companyService: CompanyService, private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnChanges() {
    console.log('companyId ricevuto ', this.companyId);

    if (this.companyId !== null) {
      this.getCompany(this.companyId);
    }


  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  getCompany(id: number) {
    this.companyService.getCompany(id).subscribe({
      next: c => {
        this.company = c;

      },
      error: err => console.error('errore caricamento companyId ', err)
    });
  }


  startCollaboration(id: number) {
    this.companyService.startCollaboration(id).subscribe({
      next: () => {
        console.log(this.company?.status);
      },
      error: (error) => {
        console.error('errore avvio collaborazione ', error);
      }
    })
  }

  isAnyRoleUnavailable(): boolean {
    return Object.values(this.roleStats).some(stat => stat.disponibili === 0);
  }


}
