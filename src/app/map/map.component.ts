import { Component, ViewChild } from '@angular/core';
import { CardComponentComponent } from '../company/card-component/card-component.component';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../services/company/company.service';



@Component({
  selector: 'app-map',
  imports: [CardComponentComponent, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  @ViewChild(CardComponentComponent) popup!: CardComponentComponent;

  constructor(private companyService: CompanyService) {}



 
  
companyColors: any = {
  //PROVARE IGNORE CASE
  //TODO aggiornamento colore con status back-end
  //TODO DELOITTE MARCHE FIX, KMPG LIGURIA, PWC VALLE, ACCENTURE ED EY TRENTINO  
  "Deloitte-Lombardia": "Disponibile",
  "Accenture-Lombardia": "Non-Disponibile",
  "EY-Lombardia": "Disponibile",
  "Reply-Lombardia": "In-Collaborazione",
  "PWC-Lombardia": "Disponibile",
  "KPMG-Lombardia": "Disponibile",
  "KPMG-Piemonte": "Non-Disponibile",
  "EY-Trentino-Alto-Adige": "Non-Disponibile",
  "Accenture-Trentino-Alto-Adige": "Non-Disponibile",
  "PWC-Valle": "Non-Disponibile",
  "Reply-Friuli": "Non-Disponibile",
  "Be-Consulting-Friuli": "Non-Disponibile",
  "Accenture-Liguria": "Non-Disponibile",
  "Be-Consulting-Sardegna": "Non-Disponibile",
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
  "Engineering-Sicilia": "Non-Disponibile"
}

   isSelected(nodeId: string) {
    document.getElementsByClassName("nodes");
   /*  this.companyService.getCompanyById(Number(nodeId)); */
    this.popup.show();
    // TODO prendere componente cardBox con Json?
    nodeId    
  } 

}

