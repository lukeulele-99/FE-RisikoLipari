import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { MapComponent } from "./map/map.component";
import { CompanyComponent } from "./company/company.component";
import { UserComponent } from "./pages/user/user.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MapComponent, CompanyComponent, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FE-Risiko-Lipari';
}
