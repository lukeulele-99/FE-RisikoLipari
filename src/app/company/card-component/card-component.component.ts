import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';
import { CompanyModel } from '../../model/Company';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-card-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.css'
})
export class CardComponentComponent implements OnChanges {

  @Input() companyId: number | null = null;

  @Output() statusChanged = new EventEmitter<string>();

  company?: CompanyModel;
  visible: boolean = false;

  private _roleStats: { [key: string]: { totali: number; staffati: number; disponibili: number } } = {};

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['companyId'] && this.companyId !== null) {
      this.getCompany(this.companyId);
    }
  }

  @Input() set roleStats(value: { [key: string]: { totali: number; staffati: number; disponibili: number } }) {
    this._roleStats = value;
    this.tryUpdateStatus(); // controlla se può diventare disponibile
  }

  get roleStats(): { [key: string]: { totali: number; staffati: number; disponibili: number } } {
    return this._roleStats;
  }

  private tryUpdateStatus() {
    if (this.company && this.company.status === 'Non Disponibile' && this.canCollaborate()) {
      this.company.status = 'Disponibile';
      this.statusChanged.emit('Disponibile');
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
        this.tryUpdateStatus(); // controllo disponibilità solo dopo aver ricevuto l'azienda
        this.statusChanged.emit(this.company.status);
      },
      error: err => console.error('Errore caricamento azienda', err)
    });
  }

  startCollaboration(id: number) {
    if (!this.canCollaborate()) {
      console.warn('Dipendenti insufficienti per collaborare.');
      return;
    }

    this.companyService.startCollaboration(id).subscribe({
      next: (c) => {
        this.company = c;
        this.statusChanged.emit(c.status);
        this.companyService.emitNewCollaboration(c);
      },
      error: (error) => {
        console.error('Errore avvio collaborazione', error);
      }
    });
  }

  canCollaborate(): boolean {
    if (!this.company || !this.roleStats) return false;

    if (this.company.status === 'In Collaborazione') {
      return false;
    }

    const required = {
      Manager: this.company.manager || 0,
      Senior: this.company.senior || 0,
      Consultant: this.company.consultant || 0
    };

    const roles: Array<keyof typeof required> = ['Manager', 'Senior', 'Consultant'];

    for (const role of roles) {
      const disponibili = this.roleStats[role]?.disponibili || 0;
      if (disponibili < required[role]) {
        return false;
      }
    }

    return true;
  }
}
