import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { MapComponent } from "./map/map.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FE-Risiko-Lipari';
}
