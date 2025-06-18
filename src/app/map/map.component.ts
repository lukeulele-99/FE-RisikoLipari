import { Component } from '@angular/core';
import { CardComponentComponent } from '../company/card-component/card-component.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-map',
  imports: [CardComponentComponent, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  
companyColors: any = {
  //TODO aggiornamento colore con status back-end
  "deloitte-lombardia": "available",
  "accenture-lombardia": "unavailable",
  "ey-lombardia": "available",
  "reply-lombardia": "inStaffing",
  "pwc-lombardia": "available",
  "kmpg-lombardia": "available",
  "kmpg-piemonte": "unavailable",
  "ey-trentino-alto-adige": "unavailable",
  "accenture-trentino-alto-adige": "unavailable",
  "pwc-valle-d-aosta": "unavailable",
  "reply-friuli": "unavailable",
  "be-consulting-friuli": "unavailable",
  "accenture-liguria": "unavailable",
  "be-consulting-sardegna": "unavailable",
  "engineering-sardegna": "unavailable",
  "deloitte-veneto": "unavailable",
  "ey-veneto": "unavailable",
  "ey-emilia": "unavailable",
  "pwc-emilia": "unavailable",
  "reply-toscana": "unavailable",
  "pwc-lazio": "unavailable",
  "ey-lazio": "unavailable",
  "accenture-lazio": "unavailable",
  "accenture-molise": "unavailable",
  "deloitte-marche": "unavailable",
  "accenture-umbria": "unavailable",
  "reply-abruzzo": "unavailable",
  "deloitte-campania": "unavailable",
  "accenture-basilicata": "unavailable",
  "deloitte-puglia": "unavailable",
  "engineering-calabria": "unavailable",
  "engineering-sicilia": "unavailable"
}

  isSelected(nodeId: String) {
    document.getElementsByClassName("nodes");
    alert("cerchio cliccato: " + nodeId);
    document.getElementById("card");
    // TODO prendere componente cardBox con Json?

  }

}

