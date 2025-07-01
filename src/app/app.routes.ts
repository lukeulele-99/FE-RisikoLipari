import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { GameComponent } from './pages/game/game.component';
import { AppComponent } from './app.component';
import { RulesComponent } from './pages/rules/rules.component';
import { EmployeeComponent } from './employee/employee.component';
import { CompanyComponent } from './company/company.component';
//import { authGuard } from './guards/auth.guard';


//GESTIONE DI TUTTE LE ROUTE DEL PROGETTO
export const routes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'game/:id', component: GameComponent }, //canActivate: [authGuard] },
    { path: 'company', component: CompanyComponent },
    { path: 'user', component: UserComponent },
    { path: 'rules', component: RulesComponent },
    { path: 'employee', component: EmployeeComponent } //canActivate: [authGuard]},
    // { path: '**', component: PageNotFoundComponent } ROUTE 404

];
