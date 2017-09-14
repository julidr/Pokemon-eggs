import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

import { AppComponent } from './app.component';
import { MyEggsComponent } from './my-eggs/my-eggs.component';
import { HomeEggsComponent } from './home-eggs/home-eggs.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

import { PokemonService } from './services/pokemon.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeEggsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'eggs', component: MyEggsComponent},
  { path: 'pokemon', component: PokemonListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MyEggsComponent,
    HomeEggsComponent,
    PokemonListComponent,
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    HttpModule,
    FormsModule,
    Ng2FilterPipeModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
