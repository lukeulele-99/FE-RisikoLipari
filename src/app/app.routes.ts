import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { GameComponent } from './pages/game/game.component';
import { AppComponent } from './app.component';
import { RulesComponent } from './pages/rules/rules.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { EmployeeComponent } from './employee/employee.component';

export const routes: Routes = [
    {path: '', redirectTo: 'user', pathMatch: 'full'},
    {path: 'game', component: GameComponent},
    {path: 'user', component: UserComponent},
    {path: 'rules', component: RulesComponent},
    {path: 'tutorial', component: TutorialComponent},
    {path: 'employee', component: EmployeeComponent}
];
