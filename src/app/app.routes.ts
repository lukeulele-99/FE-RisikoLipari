import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
    {path: '', component: UserComponent},
    {path: 'game', component: GameComponent}
];
