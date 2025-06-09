import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { MapComponent } from "./map/map.component";
import { CompanyComponent } from "./company/company.component";
import { UserComponent } from "./pages/user/user.component";
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { RulesComponent } from './pages/rules/rules.component';
import { EmployeeComponent } from "./employee/employee.component";
import { GameComponent } from './pages/game/game.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MapComponent, CompanyComponent, UserComponent, TutorialComponent, RulesComponent, EmployeeComponent, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FE-Risiko-Lipari';
}
