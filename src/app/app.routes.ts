import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { GameComponent } from './pages/game/game.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'game', component: GameComponent},
    {path: 'user', component: UserComponent}
];
