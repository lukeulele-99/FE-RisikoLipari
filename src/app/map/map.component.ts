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
  companyColors : any = { //TODO aggiornamento colore con status back-end
    "reply-lombardia" : "available",
    "kmpg-lombardia" : "inStaffing",
    "deloitte-lombardia" : "unavailable",
    

  } 
  isSelected(nodeId: String) {
    document.getElementsByClassName("nodes");
    alert("cerchio cliccato: " + nodeId);
    document.getElementById("card");
    // TODO prendere componente cardBox con Json?

  }

}

