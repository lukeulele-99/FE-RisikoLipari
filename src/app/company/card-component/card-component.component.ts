import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';
import { CompanyModel } from '../../model/Company';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../model/Employee';
import { stat } from 'fs';
import { OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card-component',
  imports: [CommonModule],
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.css'
})
export class CardComponentComponent implements OnChanges {

  @Input() companyId: number | null = null;

  @Output() statusChanged = new EventEmitter<string>();

  company?: CompanyModel

  visible: boolean = false;

  @Input() roleStats!: { [key: string]: { totali: number; staffati: number; disponibili: number } };

  tryUpdateStatus() {

    if (!this.company && !this.roleStats) {
      console.log('Skip update: company or roleStats not ready yet');
      return;
    }

    if (this.company && this.company.status === 'Non Disponibile'  && this.canCollaborate()) {
      this.company.status = 'Disponibile';
      this.statusChanged.emit(this.company.status);
    }
  }


  constructor(private companyService: CompanyService, private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('companyId ricevuto ', this.companyId);

    if (changes['roleStats']) {
      console.log('roleStats aggiornato ', this.roleStats);
    }

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
        this.statusChanged.emit(c.status);
        this.tryUpdateStatus();
      },
      error: err => console.error('errore caricamento companyId ', err)
    });
  }


  startCollaboration(id: number) {

    this.companyService.startCollaboration(id).subscribe({
      next: (c) => {
        this.company = c;
        this.company.status = c.status;
        console.log(this.company?.status);
        if (c.status == 'In Collaborazione') {
          this.statusChanged.emit(c.status);
          this.companyService.emitNewCollaboration(c);
          
          alert('Collaborazione andata a buon fine! Selezionare nuovo turno per la prossima collaborazione');

          this.companyService.emitRefreshCompanies(true);
        }

      },
      error: (error) => {
        console.error('errore avvio collaborazione ', error);
      }
    })


  }

  canCollaborate(): boolean {
    console.log('canCollaborate called, company:', this.company);
    console.log('roleStats:', this.roleStats);
    if (!this.company || !this.roleStats) return false;

    //controlla stato azienda
    if (this.company.status === 'In Collaborazione') {
      return false;
    }

    //controlla che i dipendenti siano sufficienti
    const required: { Manager: number; Senior: number; Consultant: number } = {
      Manager: this.company.manager || 0,
      Senior: this.company.senior || 0,
      Consultant: this.company.consultant || 0
    };

    type Role = 'Manager' | 'Senior' | 'Consultant';
    const roles: Role[] = ['Manager', 'Senior', 'Consultant'];

    for (const role of roles) {
      const disponibili = this.roleStats[role]?.disponibili || 0;
      if (disponibili < required[role]) {
        return false;
      }
    }

    return true;
  }


}
