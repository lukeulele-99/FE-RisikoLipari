import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CardComponentComponent } from '../company/card-component/card-component.component';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../services/company/company.service';
import { CompanyModel } from '../model/Company';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-map',
  imports: [CardComponentComponent, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  @Input() gameId!: number;

  @ViewChild(CardComponentComponent) popup!: CardComponentComponent;

  companiesInGame: CompanyModel[] = [];

  selectedCompanyId: number | null = null;

  nodeId: string = '';

  @Output() companySelected = new EventEmitter<number>();

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompaniesByGameId(this.gameId).subscribe({
      next: (companies) => {
        this.companiesInGame = Array.isArray(companies) ? companies : [companies];
        this.companiesInGame.forEach(company => {
          const nodeName = company.name;
          if (company.status === "Disponibile") {
            this.companyColors[nodeName] = "Disponibile";
          } else if (company.status === "In Collaborazione") {
            this.companyColors[nodeName] = "In-Collaborazione";
          } else if (company.status === "Non Disponibile") {
            this.companyColors[nodeName] = "Non-Disponibile";
          } else {
            this.companyColors[nodeName] = company.status ?? '';
          }
        });

        this.onStatusChanged(this.nodeId);
      },
      error: (err) => console.error('Errore nel caricamento aziende per game:', err)
    });


  }

  companyColors: { [key: string]: string } = {
    //PROVARE IGNORE CASE
    //TODO aggiornamento colore con status back-end (POTREBBE ESSERE CAMBIARE IL PARAMETRO?)

    "Deloitte-Lombardia": "Disponibile",
    "Accenture-Lombardia": "Non-Disponibile",
    "EY-Lombardia": "Disponibile",
    "Reply-Lombardia": "In-Collaborazione",
    "PWC-Lombardia": "Disponibile",
    "KPMG-Lombardia": "Disponibile",
    "KPMG-Piemonte": "Non-Disponibile",
    "EY-Trentino Alto Adige": "Non-Disponibile",
    "Accenture-Trentino Alto Adige": "Non-Disponibile",
    "PWC-Valle": "Non-Disponibile",
    "Reply-Friuli": "Non-Disponibile",
    "Be Consulting-Friuli": "Non-Disponibile",
    "Accenture-Liguria": "Non-Disponibile",
    "Be Consulting-Sardegna": "Non-Disponibile",
    "Engineering-Sardegna": "Non-Disponibile",
    "Deloitte-Veneto": "Non-Disponibile",
    "EY-Veneto": "Non-Disponibile",
    "EY-Emilia": "Non-Disponibile",
    "PWC-Emilia": "Non-Disponibile",
    "Reply-Toscana": "Non-Disponibile",
    "PWC-Lazio": "Non-Disponibile",
    "EY-Lazio": "Non-Disponibile",
    "Accenture-Lazio": "Non-Disponibile",
    "Accenture-Molise": "Non-Disponibile",
    "Deloitte-Marche": "Non-Disponibile",
    "Accenture-Umbria": "Non-Disponibile",
    "Reply-Abruzzo": "Non-Disponibile",
    "Deloitte-Campania": "Non-Disponibile",
    "Accenture-Basilicata": "Non-Disponibile",
    "Deloitte-Puglia": "Non-Disponibile",
    "Engineering-Calabria": "Non-Disponibile",
    "Engineering-Sicilia": "Non-Disponibile",
  }

  nodeIdToCompanyName: { [key: string]: string } = {
    "Deloitte-Lombardia": "Deloitte-Lombardia",
    "Accenture-Lombardia": "Accenture-Lombardia",
    "EY-Lombardia": "EY-Lombardia",
    "Reply-Lombardia": "Reply-Lombardia",
    "PWC-Lombardia": "PWC-Lombardia",
    "KPMG-Lombardia": "KPMG-Lombardia",
    "KPMG-Piemonte": "KPMG-Piemonte",
    "EY-Trentino Alto Adige": "EY-Trentino Alto Adige",
    "Accenture-Trentino Alto Adige": "Accenture-Trentino Alto Adige",
    "PWC-Valle": "PWC-Valle",
    "Reply-Friuli": "Reply-Friuli",
    "Be Consulting-Friuli": "Be Consulting-Friuli",
    "Accenture-Liguria": "Accenture-Liguria",
    "Be Consulting-Sardegna": "Be Consulting-Sardegna",
    "Engineering-Sardegna": "Engineering-Sardegna",
    "Deloitte-Veneto": "Deloitte-Veneto",
    "EY-Veneto": "EY-Veneto",
    "EY-Emilia": "EY-Emilia",
    "PWC-Emilia": "PWC-Emilia",
    "Reply-Toscana": "Reply-Toscana",
    "PWC-Lazio": "PWC-Lazio",
    "EY-Lazio": "EY-Lazio",
    "Accenture-Lazio": "Accenture-Lazio",
    "Accenture-Molise": "Accenture-Molise",
    "Deloitte-Marche": "Deloitte-Marche",
    "Accenture-Umbria": "Accenture-Umbria",
    "Reply-Abruzzo": "Reply-Abruzzo",
    "Deloitte-Campania": "Deloitte-Campania",
    "Accenture-Basilicata": "Accenture-Basilicata",
    "Deloitte-Puglia": "Deloitte-Puglia",
    "Engineering-Calabria": "Engineering-Calabria",
    "Engineering-Sicilia": "Engineering-Sicilia"
  };

  onStatusChanged(newStatus: string) {
    console.log('status ricevuto dal figlio card ', newStatus);

    if (newStatus == "In Collaborazione") {
      this.companyColors[this.nodeId] = 'In-Collaborazione';
    } else if (newStatus == "Non Disponibile") {
      this.companyColors[this.nodeId] = 'Non-Disponibile'
    } else if (newStatus == 'Fine Collaborazione') {
      this.companyColors[this.nodeId] = 'Fine-Collaborazione'
    } else {
      this.companyColors[this.nodeId] = newStatus;
    }

  }

  isSelected(nodeId: string) {
    this.nodeId = nodeId
    const companyName = this.nodeIdToCompanyName[nodeId];
    const matchedCompany = this.companiesInGame.find(c => c.name === companyName);
    /* const matchedCompanyStatus = this.companiesInGame.find(c => c.status === companyStatus); */
    if (matchedCompany) {
      this.selectedCompanyId = matchedCompany.id;
      this.popup.companyId = matchedCompany.id;
      /* this.popup.companyId = matchedCompanyStatus.id; */
      this.popup.show();

      this.companySelected.emit(matchedCompany.id);

    } else {
      console.error('id azienda non trovato per ', nodeId);
    }
  }

}

