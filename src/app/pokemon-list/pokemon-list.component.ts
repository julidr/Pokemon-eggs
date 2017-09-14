import { Component, OnInit, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { PokemonService } from './../services/pokemon.service';
import { Pokemon } from './../pokemon';

import { NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import {MaterializeDirective, MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemon: Array<Pokemon> = [];
  pokemonFilter: any = { name: ''};
  isWriting: boolean = false;
  private baseSpriteUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  globalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private http: Http,
    private pokemonService: PokemonService,
  ) { }

  ngOnInit() {

    this.pokemonService.getAllPokemon().subscribe(
      data => {
        var idValue = 0;
        for(var i=0; i<721; i++){
          idValue = idValue +1;
          var poke = {
            id: idValue,
            name: data[i].name+'',
            sprite: this.baseSpriteUrl+idValue+'.png'
          }
          this.pokemon.push(poke);
        }
      }
    );

  }

  getPokemonByName(name: string) {
    console.log(name);
  }

  onKey(value){
    if(value==''){
      this.isWriting = false;
    }
    else {
      this.isWriting= true;
    }
  }

  addPokemon(poke: Pokemon){
    this.pokemonService.addPokemon(poke);
  }

}
