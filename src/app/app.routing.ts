import { Routes, RouterModule } from '@angular/router';

import { MyEggsComponent } from './my-eggs/my-eggs.component';
import { HomeEggsComponent } from './home-eggs/home-eggs.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { StadisticsEggsComponent } from './stadistics-eggs/stadistics-eggs.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeEggsComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'eggs', component: MyEggsComponent},
    { path: 'pokemon', component: PokemonListComponent},
    { path: 'stadistics', component: StadisticsEggsComponent}
  ];

export const routing = RouterModule.forRoot(appRoutes);