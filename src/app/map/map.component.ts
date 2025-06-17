import { Component } from '@angular/core';
import { CardComponentComponent } from '../company/card-component/card-component.component';

@Component({
  selector: 'app-map',
  imports: [CardComponentComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  isSelected() {
  document.getElementsByClassName("nodes");
  alert ("cerchio cliccato");
  document.getElementsByClassName("card");
  // TODO prendere componente cardBox con Json?

}

}

