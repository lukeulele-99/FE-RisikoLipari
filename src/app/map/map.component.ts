import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  onClick() {
    alert("Nodo cliccato con successo")
  }

  /* 
  isSelected() {
    MapComponent.addEventListener("click", this.isSelected);
    const selected = 
  } */

}

function isSelected() {
  document.getElementsByClassName("circles");
  alert ("cerchio cliccato")

}