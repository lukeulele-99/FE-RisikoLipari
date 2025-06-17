import { Component } from '@angular/core';
import { CardComponentComponent } from '../company/card-component/card-component.component';

@Component({
  selector: 'app-map',
  imports: [CardComponentComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})



export class MapComponent {

  isSelected(nodeId:String) {
    document.getElementsByClassName("nodes");
    alert("cerchio cliccato: " + nodeId );
    document.getElementById("card");
    // TODO prendere componente cardBox con Json?

  }

}

