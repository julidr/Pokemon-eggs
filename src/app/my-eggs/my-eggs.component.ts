import { Component, OnInit } from '@angular/core';
import { Pokemon } from './../pokemon';
import { PokemonService } from './../services/pokemon.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-my-eggs',
  templateUrl: './my-eggs.component.html',
  styleUrls: ['./my-eggs.component.css']
})
export class MyEggsComponent implements OnInit {

  babyCrib: Array<Pokemon> = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.babyCrib = this.pokemonService.getBabyCrib();
  }

}
