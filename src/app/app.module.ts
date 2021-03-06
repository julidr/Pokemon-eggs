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
import { StadisticsEggsComponent } from './stadistics-eggs/stadistics-eggs.component';

import { PokemonService } from './services/pokemon.service';
import { D3Service } from 'd3-ng2-service';
import { SortByPipe } from './pipes/sort-by.pipe';

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    MyEggsComponent,
    HomeEggsComponent,
    PokemonListComponent,
    SortByPipe,
    StadisticsEggsComponent,
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    HttpModule,
    FormsModule,
    Ng2FilterPipeModule,
    routing,
  ],
  providers: [PokemonService, D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
