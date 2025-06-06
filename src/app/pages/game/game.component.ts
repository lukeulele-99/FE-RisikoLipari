import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { MapComponent } from "../../map/map.component";
import { CompanyComponent } from "../../company/company.component";

@Component({
  selector: 'app-game',
  imports: [NavbarComponent, MapComponent, CompanyComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

}
